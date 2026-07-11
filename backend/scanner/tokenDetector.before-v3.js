require("dotenv").config();

const PUMP_PROGRAM = process.env.PUMP_PROGRAM_ID || "";

function detectNewTokens(block) {

    console.log("=== DEBUG TOKEN DETECTOR ===");

    console.log(
        "Bloc reçu:",
        !!block
    );

    console.log(
        "Transactions:",
        block?.transactions?.length || 0
    );



    if (!block) return [];

    const transactions =
        block.transactions ||
        block.result?.transactions ||
        [];

    const tokens = [];

    // DEBUG COUNTERS
    let analyzed = 0;
    let mintFound = 0;

    const seen = new Set();

    for (const tx of transactions) {

        analyzed++;


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

            mintFound++;

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

    console.log("DEBUG COUNTERS:", {
        analyzed,
        mintFound,
        returned: tokens.length
    });

    return tokens;

}

module.exports = {
    detectNewTokens
};
