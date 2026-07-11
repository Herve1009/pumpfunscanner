require("dotenv").config();

const PUMP_PROGRAM = process.env.PUMP_PROGRAM_ID || "";

function detectNewTokens(block) {

    if (!block) return [];

    const transactions =
        block.transactions ||
        block.result?.transactions ||
        [];

    const tokens = [];
    const seen = new Set();

    for (const tx of transactions) {

        try {

            const accounts =
                tx.transaction?.message?.accountKeys || [];

            const usesPump =
                PUMP_PROGRAM &&
                accounts.some(a =>
                    (a.pubkey || a).toString() === PUMP_PROGRAM
                );

            if (!usesPump) continue;

            const mint =
                tx.meta?.postTokenBalances?.[0]?.mint;

            if (!mint) continue;

            if (seen.has(mint)) continue;

            seen.add(mint);

            tokens.push({
                mint,
                signature:
                    tx.transaction?.signatures?.[0] || null,
                detectedAt:
                    Date.now()
            });

        } catch (err) {

            console.log(
                "Token parse error:",
                err.message
            );

        }

    }

    console.log(
        `✅ ${tokens.length} token(s) détecté(s)`
    );

    return tokens;

}

module.exports = {
    detectNewTokens
};
