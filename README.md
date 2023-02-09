# Hardhat node event indexer
A simple tool for indexing solidity events within the development Hardhat node.
This app will listen to every event in the blockchain (past and future) and store only the selected ones (by schema definition) in a lightweight database. 
Users can then query the indexed events by calling a simple REST API.

## How to use
1. Install dependencies
```
yarn install
```

2. Update tool settings in config.js file
* providerUrl: Hardhat node HTTP url (default: http://127.0.0.1:8545)
* connectionTimeout: Hardhat node connection timeout (default: 20000ms)
* schema: a JSON file that defines the events (and attributes) to be indexed by the app
```
{
    {Event name}: {
        {attribute-1 name} : {attribute-1 type},
        {attribute-2 name} : {attribute-2 type},
    }
}
```
For instance, if we have this event defined in the contract:
``` 
event ItemBought {
    uint256 indexed tokenId;
    address indexed owner;
}
```

The schema should be defined like this:
```
{
    ItemBought: {
        tokenId: "number",
        owner: "string"
    }
}
```
Note: attribute types are not currently used, but they must be defined in schema.

* pollInterval: how often the listener will query the latest events from the blockchain (default: 3000ms)
* apiPort: port where the REST API runs (default: 9091)
* contractAddress: address of the contract to listen events from
* contractAbi: abi of the contract to listen events from

3. Make sure that your Hardhat node is running
```
yarn hardhat node
```

4. Run it
```
yarn run start
```

5. Querying events
```
curl --request GET 'localhost:9091/getEvents?evtName={Event name defined in schema}'
```
For example:
```
curl --request GET 'localhost:9091/getEvents?evtName=ItemBought'
```
Would return

```
{
    "id": "log_d8362ca9",
    "evtName": "ItemBought",
    "data": {
        "tokenId": 1,
        "owner": "0xcdc9D7811974744355d74819D044b2B92D75b83e",
    },
    "blockNumber": 16277529
},
{
    "id": "log_c3e16b2f",
    "evtName": "ItemBought",
    "data": {
        "tokenId": 2
        "owner": "0xcdc9D7811974744355d74819D044b2B92D75b83e",
    },
    "blockNumber": 16277530
}
```

Using filters:

```
curl --request GET 'localhost:9091/getEvents?evtName={Event name defined in schema}&filters={"attr": "value"}'
```
For example:
```
curl --request GET 'localhost:9091/getEvents?evtName=ItemBought&filters={"tokenId": 1}'
```
Would return

```
{
    "id": "log_d8362ca9",
    "evtName": "ItemBought",
    "data": {
        "tokenId": 1,
        "owner": "0xcdc9D7811974744355d74819D044b2B92D75b83e",
    },
    "blockNumber": 16277529
}
```

## To Do
1. Add exception handling