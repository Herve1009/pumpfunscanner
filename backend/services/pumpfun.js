const axios = require("axios");

const API =
  "https://frontend-api.pump.fun/coins?offset=0&limit=20&sort=created_timestamp&order=DESC";

async function getLatestTokens() {
  try {
    const { data } = await axios.get(API, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json"
      },
      timeout: 10000
    });

    return data;
  } catch (err) {
    console.error("Pump.fun :", err.message);
    return [];
  }
}

module.exports = {
  getLatestTokens
};
