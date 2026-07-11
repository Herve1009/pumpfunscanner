const axios = require("axios");

const API_KEY = process.env.HELIUS_API_KEY;

async function getWhaleActivity(mint) {

    try {

        const url =
            `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`;

        const { data } = await axios.post(url, {

            jsonrpc: "2.0",
            id: 1,
            method: "getTokenLargestAccounts",
            params: [mint]

        });

        const accounts = data.result?.value || [];

        let whales = 0;
        let whaleSupply = 0;

        for (const acc of accounts) {

            const amount = Number(acc.uiAmount || 0);

            if (amount >= 100000) {

                whales++;
                whaleSupply += amount;

            }

        }

        return {

            whales,
            whaleSupply

        };

    } catch (err) {

        return {

            whales: 0,
            whaleSupply: 0

        };

    }

}

module.exports = {

    getWhaleActivity

};
