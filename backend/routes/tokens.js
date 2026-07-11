const express = require("express");
const { getLatestTokens } = require("../services/pumpfun");
const { getTokenData } = require("../services/dexscreener");
const { saveToken } = require("../services/tokenStorage");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tokens = await getLatestTokens();

    for (const token of tokens) {

      const mint = token.mint || token.address;

      const dex = await getTokenData(mint);

      await saveToken({
        mint,
        symbol: token.symbol || "UNKNOWN",
        name: token.name || "Unknown",

        price: dex?.price || 0,
        liquidity: dex?.liquidity || 0,
        marketCap: dex?.marketCap || 0,
        volume24h: dex?.volume24h || 0,

        holders: token.holders || 0,
        ageMinutes: token.ageMinutes || 0
      });
    }

    res.json({
      success: true,
      total: tokens.length
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  }
});

module.exports = router;
