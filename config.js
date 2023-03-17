export const config = {
    providerUrl: "http://127.0.0.1:8545",
    connectionTimeout: 20000,
    schema: {
        GigCreated: {
            nftAddress: "address",
            creator: "address",
            name: "string",
        },
        TicketAdded: {
            nftAddress: "address",
            buyer: "address",
            tokenId: "number",
        },
    },
    pollInterval: 3000,
    apiPort: 9091,
    contractAddress: "0xD1760AA0FCD9e64bA4ea43399Ad789CFd63C7809",
    contractAbi: [
        { type: "error", name: "Market__InvalidCaller", inputs: [] },
        { type: "error", name: "Market__InvalidDate", inputs: [] },
        { type: "error", name: "Market__InvalidLimit", inputs: [] },
        { type: "error", name: "Market__InvalidName", inputs: [] },
        { type: "error", name: "Market__InvalidPrice", inputs: [] },
        { type: "error", name: "Market__InvalidTokenUri", inputs: [] },
        {
            type: "event",
            anonymous: false,
            name: "GigCreated",
            inputs: [
                { type: "address", name: "nftAddress", indexed: true },
                { type: "address", name: "creator", indexed: true },
                { type: "string", name: "name", indexed: false },
            ],
        },
        {
            type: "event",
            anonymous: false,
            name: "TicketAdded",
            inputs: [
                { type: "address", name: "nftAddress", indexed: true },
                { type: "address", name: "buyer", indexed: true },
                { type: "uint256", name: "tokenId", indexed: false },
            ],
        },
        {
            type: "function",
            name: "addTicket",
            constant: false,
            payable: false,
            gas: 29000000,
            inputs: [
                { type: "address", name: "_buyer" },
                { type: "uint256", name: "_tokenId" },
            ],
            outputs: [],
        },
        {
            type: "function",
            name: "createGig",
            constant: false,
            payable: false,
            gas: 29000000,
            inputs: [
                { type: "string", name: "_name" },
                { type: "uint256", name: "_limit" },
                { type: "uint256", name: "_price" },
                { type: "uint256", name: "_date" },
                { type: "string", name: "_tokenUri" },
            ],
            outputs: [],
        },
        {
            type: "function",
            name: "getGig",
            constant: true,
            stateMutability: "view",
            payable: false,
            gas: 29000000,
            inputs: [{ type: "address", name: "nftAddress" }],
            outputs: [
                {
                    type: "tuple",
                    components: [
                        { type: "string", name: "name" },
                        { type: "uint256", name: "price" },
                        { type: "uint256", name: "date" },
                        { type: "string", name: "tokenUri" },
                    ],
                },
            ],
        },
        {
            type: "function",
            name: "getGigsList",
            constant: true,
            stateMutability: "view",
            payable: false,
            gas: 29000000,
            inputs: [],
            outputs: [{ type: "address[]" }],
        },
        {
            type: "function",
            name: "getTickets",
            constant: true,
            stateMutability: "view",
            payable: false,
            gas: 29000000,
            inputs: [{ type: "address", name: "_buyer" }],
            outputs: [
                {
                    type: "tuple[]",
                    components: [
                        { type: "address", name: "nftAddress" },
                        { type: "uint256", name: "tokenId" },
                    ],
                },
            ],
        },
    ],
};
