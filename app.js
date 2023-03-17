import Web3 from "web3";
import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { setTimeout } from "timers/promises";
import { config } from "./config.js";
import cors from "cors";

const {
    providerUrl,
    connectionTimeout,
    schema,
    pollInterval,
    apiPort,
    contractAddress,
    contractAbi,
} = config;

const web3 = new Web3(
    new Web3.providers.HttpProvider(providerUrl, {
        keepAlive: true,
        timeout: connectionTimeout,
    })
);
const contract = new web3.eth.Contract(contractAbi, contractAddress);

let lastBlock = 0;
const adapter = new JSONFile("db.json");
const db = new Low(adapter);
db.data = {};
for (const evtType of Object.entries(schema)) {
    db.data[evtType[0]] = [];
}

const app = express();
app.use(cors());
app.get("/getEvents", async function (req, res) {
    const { evtName } = req.query;
    const { filters } = req.query;
    await db.read();
    let data = db.data[evtName];
    if (filters) {
        const filtersJson = JSON.parse(filters);
        data = data.filter(function (item) {
            for (const key in filtersJson) {
                if (
                    item.data[key] == undefined ||
                    item.data[key].toLowerCase() != filtersJson[key].toLowerCase()
                )
                    return false;
            }
            return true;
        });
    }
    res.json(data);
});

const startListener = async () => {
    while (true) {
        contract
            .getPastEvents("allEvents", {
                fromBlock: lastBlock + 1,
            })
            .then(function (events) {
                for (const event of events) {
                    const { id: evtId, event: evtName, blockNumber, returnValues } = event;
                    lastBlock = blockNumber;
                    if (schema.hasOwnProperty(evtName)) {
                        const attributes = schema[evtName];
                        let data = {};
                        for (const attr of Object.entries(attributes)) {
                            const attrName = attr[0];
                            const attrType = attr[1];
                            data[attrName] = returnValues[attrName];
                        }
                        if (!db.data[evtName].find((evt) => evt.id == evtId)) {
                            db.data[evtName].push({ id: evtId, evtName, data, blockNumber });
                        }
                    }
                }
            });
        await db.write();
        await setTimeout(pollInterval);
    }
};

const server = app.listen(apiPort, "localhost", function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});

startListener();
