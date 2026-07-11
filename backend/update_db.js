require("dotenv").config();
const { pool } = require("./database/database");

(async () => {
  try {
    await pool.query(`
      ALTER TABLE tokens
      ADD COLUMN IF NOT EXISTS gem_score INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS volume DOUBLE PRECISION DEFAULT 0,
      ADD COLUMN IF NOT EXISTS market_cap DOUBLE PRECISION DEFAULT 0,
      ADD COLUMN IF NOT EXISTS liquidity DOUBLE PRECISION DEFAULT 0,
      ADD COLUMN IF NOT EXISTS holders INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS signal TEXT DEFAULT '',
      ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS symbol TEXT DEFAULT '',
      ADD COLUMN IF NOT EXISTS name TEXT DEFAULT '',
      ADD COLUMN IF NOT EXISTS price DOUBLE PRECISION DEFAULT 0;
    `);

    console.log("✅ Base de données mise à jour.");
  } catch (err) {
    console.error("❌", err.message);
  } finally {
    await pool.end();
  }
})();
