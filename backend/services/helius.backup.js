const axios = require("axios");

const API_KEY = process.env.HELIUS_API_KEY;

const RPC =
    process.env.HELIUS_RPC_URL ||
    `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`;

async function rpc(method, params = []) {

    try {

        const { data } = await axios.post(RPC, {
            jsonrpc: "2.0",
            id: 1,
            method,
            params
        });

        return data.result;

    } catch (err) {

        console.error(
            "Helius RPC Error:",
            err.message
        );

        return null;

    }

}

async function getCurrentSlot() {

    return await rpc("getSlot");

}

async function getCurrentBlock() {

    const slot = await getCurrentSlot();

    if (!slot)
        return null;

    return await rpc("getBlock", [
        slot,
        {
            encoding: "jsonParsed",
            maxSupportedTransactionVersion: 0,
            transactionDetails: "full",
            rewards: false
        }
    ]);

}

module.exports = {

    getCurrentSlot,
    getCurrentBlock,
    rpc

};
