const axios = require("axios");

const API_KEY = process.env.BIRDEYE_API_KEY;

async function getTokenData(mint) {

    try {

        const response = await axios.get(

            `https://public-api.birdeye.so/defi/token_overview?address=${mint}`,

            {
                headers: {
                    "X-API-KEY": API_KEY,
                    "accept": "application/json"
                }
            }

        );

        return response.data.data;

    } catch (err) {

        return null;

    }

}

module.exports = {
    getTokenData
};
