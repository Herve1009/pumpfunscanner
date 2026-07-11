const db = require("./database");

async function saveToken(token) {
  try {
    await db.query(
      `
      INSERT INTO tokens (
        mint,
        symbol,
        name,
        price,
        market_cap,
        liquidity,
        holders,
        score,
        signal
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)

      ON CONFLICT (mint)
      DO UPDATE SET
        symbol = EXCLUDED.symbol,
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        market_cap = EXCLUDED.market_cap,
        liquidity = EXCLUDED.liquidity,
        holders = EXCLUDED.holders,
        score = EXCLUDED.score,
        signal = EXCLUDED.signal,
        created_at = CURRENT_TIMESTAMP
      `,
      [
        token.mint,
        token.symbol,
        token.name,
        token.price || 0,
        token.marketCap || 0,
        token.liquidity || 0,
        token.holders || 0,
        token.score || 0,
        token.signal || "IGNORE"
      ]
    );

    console.log(`✅ ${token.symbol} | ${token.score} | ${token.signal}`);

  } catch (err) {
    console.error("❌ Erreur BDD :", err.message);
  }
}

module.exports = {
  saveToken
};
