
require("dotenv").config();

function detectNewTokens(block) {

    if (!block) return [];

    const transactions =
        block.transactions || [];

    const tokens = [];
    const seen = new Set();

    console.log("🔎 Transactions analysées:", transactions.length);

    for (const tx of transactions) {

        try {

            const balances =
                tx.meta?.postTokenBalances || [];

            for (const balance of balances) {

                const mint = balance.mint;

                if (!mint) continue;

                if (seen.has(mint)) continue;

                seen.add(mint);

                tokens.push({
                    mint,
                    detectedAt: Date.now()
                });

            }

        } catch(err) {

            console.log(
                "Token analyse erreur:",
                err.message
            );

        }
    }

    console.log(
        "🪙 Tokens détectés:",
        tokens.length
    );

    return tokens;
}

module.exports = {
    detectNewTokens
};
