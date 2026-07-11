const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function initDatabase() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tokens (
            id SERIAL PRIMARY KEY,
            mint TEXT UNIQUE NOT NULL,
            symbol TEXT,
            name TEXT,
            score INTEGER,
            gem_score INTEGER,
            signal TEXT,
            price DOUBLE PRECISION,
            liquidity DOUBLE PRECISION,
            volume DOUBLE PRECISION,
            market_cap DOUBLE PRECISION,
            holders INTEGER,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `);

    console.log("✅ Base PostgreSQL initialisée.");
}

module.exports = {
    pool,
    initDatabase
};
