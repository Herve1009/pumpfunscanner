const axios = require("axios");

async function getTokenData(mint) {
  try {
    const url = `https://api.dexscreener.com/latest/dex/tokens/${mint}`;

    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent": "PumpFunScanner"
      }
    });

    if (!data.pairs || data.pairs.length === 0) {
      return null;
    }

    const pair = data.pairs[0];

    return {
      price: Number(pair.priceUsd || 0),
      liquidity: Number(pair.liquidity?.usd || 0),
      marketCap: Number(pair.marketCap || pair.fdv || 0),
      volume24h: Number(pair.volume?.h24 || 0),
      dex: pair.dexId || "",
      chain: pair.chainId || ""
    };

  } catch (err) {
    return null;
  }
}

module.exports = {
  getTokenData
};
