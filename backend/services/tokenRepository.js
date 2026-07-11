const { pool } = require("../database/database");

async function saveToken(token) {
    await pool.query(
        `INSERT INTO tokens
        (mint,symbol,name,score,gem_score,signal,price,liquidity,volume,market_cap,holders)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        ON CONFLICT (mint)
        DO UPDATE SET
            symbol = EXCLUDED.symbol,
            name = EXCLUDED.name,
            score = EXCLUDED.score,
            gem_score = EXCLUDED.gem_score,
            signal = EXCLUDED.signal,
            price = EXCLUDED.price,
            liquidity = EXCLUDED.liquidity,
            volume = EXCLUDED.volume,
            market_cap = EXCLUDED.market_cap,
            holders = EXCLUDED.holders;`,
        [
            token.mint,
            token.symbol,
            token.name,
            token.score,
            token.gemScore,
            token.signal,
            token.price,
            token.liquidity,
            token.volume24h,
            token.marketCap,
            token.holders
        ]
    );
}

module.exports = { saveToken };

async function getTopTokens(limit = 10) {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM tokens
        ORDER BY gem_score DESC, score DESC
        LIMIT $1
        `,
        [limit]
    );

    return rows;
}

module.exports.getTopTokens = getTopTokens;
