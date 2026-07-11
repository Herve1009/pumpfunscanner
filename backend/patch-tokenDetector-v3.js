const fs = require("fs");

const file = "scanner/tokenDetector.js";
const backup = "scanner/tokenDetector.before-v3.js";

if (!fs.existsSync(file)) {
    console.log("❌ tokenDetector.js introuvable");
    process.exit(1);
}

fs.copyFileSync(file, backup);

const code = `
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
`;

fs.writeFileSync(file, code);

console.log("✅ TokenDetector V3 installé");
console.log("Backup:", backup);
