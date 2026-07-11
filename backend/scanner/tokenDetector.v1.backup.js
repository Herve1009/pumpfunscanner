function detectNewTokens(block) {

    const tokens = [];
    const seen = new Set();

    if (!block || !Array.isArray(block.transactions)) {
        return tokens;
    }

    for (const tx of block.transactions) {

        try {

            const balances = tx.meta?.postTokenBalances || [];

            for (const balance of balances) {

                const mint = balance?.mint;

                if (!mint) continue;

                if (!mint.endsWith("pump")) continue;

                if (seen.has(mint)) continue;

                seen.add(mint);

                tokens.push({
                    mint,
                    creator: balance.owner || "",
                    symbol: balance.symbol || "TOKEN",
                    name: balance.name || "Unknown",
                    decimals: balance.uiTokenAmount?.decimals || 0,
                    amount: balance.uiTokenAmount?.uiAmount || 0
                });

            }

        } catch (err) {

            console.error("Erreur tokenDetector :", err.message);

        }

    }

    return tokens;

}

module.exports = {
    detectNewTokens
};
