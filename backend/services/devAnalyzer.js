const axios = require("axios");

const API_KEY = process.env.HELIUS_API_KEY;

async function getDeveloperScore(wallet) {

    try {

        if (!wallet) {
            return {
                score: 50,
                risk: "UNKNOWN"
            };
        }

        const { data } = await axios.post(
            `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`,
            {
                jsonrpc: "2.0",
                id: 1,
                method: "getAssetsByOwner",
                params: {
                    ownerAddress: wallet,
                    page: 1,
                    limit: 100
                }
            }
        );

        const total = data.result?.total || 0;

        let score = 100;

        if (total < 2) score -= 5;
        if (total > 200) score -= 20;
        if (total > 500) score -= 40;

        return {
            score,
            risk:
                score >= 80
                    ? "LOW"
                    : score >= 50
                    ? "MEDIUM"
                    : "HIGH"
        };

    } catch {

        return {
            score: 50,
            risk: "UNKNOWN"
        };

    }

}

module.exports = {
    getDeveloperScore
};
