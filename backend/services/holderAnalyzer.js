const axios = require("axios");

const API_KEY = process.env.HELIUS_API_KEY;

async function getHolderStats(mint) {
    try {

        const url = `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`;

        // Top holders
        const largest = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "getTokenLargestAccounts",
            params: [mint]
        });

        const accounts = largest.data.result?.value || [];

        let totalSupply = 0;
        let top10Supply = 0;
        let whales = 0;

        for (const acc of accounts) {

            const amount = Number(acc.uiAmount || 0);

            totalSupply += amount;

            if (amount > 0)
                whales++;

        }

        for (const acc of accounts.slice(0, 10)) {

            top10Supply += Number(acc.uiAmount || 0);

        }

        const top10Percentage =
            totalSupply > 0
                ? Number(((top10Supply / totalSupply) * 100).toFixed(2))
                : 100;

        return {

            holders: accounts.length,

            whales,

            top10Percentage

        };

    } catch (err) {

        return {

            holders: 0,

            whales: 0,

            top10Percentage: 100

        };

    }
}

module.exports = {
    getHolderStats
};
