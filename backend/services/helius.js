require("dotenv").config();

const axios = require("axios");

const RPC =
`https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;

async function rpc(method, params = []) {

    const { data } = await axios.post(RPC, {
        jsonrpc: "2.0",
        id: 1,
        method,
        params
    });

    if (data.error) {
        throw new Error(data.error.message);
    }

    return data.result;
}

async function getCurrentBlock() {

    try {

        const slot = await rpc("getSlot");

        const block = await rpc("getBlock", [
            slot,
            {
                encoding: "json",
                transactionDetails: "full",
                rewards: false,
                maxSupportedTransactionVersion: 0
            }
        ]);

        return block;

    } catch (err) {

        console.log("❌ HELIUS:", err.message);

        return null;

    }

}

module.exports = {
    getCurrentBlock
};
