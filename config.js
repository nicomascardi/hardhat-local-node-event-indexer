export const config = {
    providerUrl: "http://127.0.0.1:8545",
    connectionTimeout: 20000,
    schema: {
        ItemBought: {
            tokenId: "number",
            owner: "string",
        },
    },
    pollInterval: 3000,
    apiPort: 9091,
    contractAddress: "",
    contractAbi: [],
};
