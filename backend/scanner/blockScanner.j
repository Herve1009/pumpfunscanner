require("dotenv").config();

const { getCurrentBlock } = require("../services/helius");
const { detectNewTokens } = require("./tokenDetector");
const { getTokenMetadata } = require("../services/tokenMetadata");
const { getTokenData } = require("../services/dexscreener");
const { saveToken } = require("../services/tokenStorage");
const { analyzeRisk } = require("../services/riskAnalyzer");

async function scanLatestBlock() {
    console.clear();

    console.log("========================================");
    console.log("🚀 PumpFunScanner PRO V5");
    console.log("========================================");

    try {
        const block = await getCurrentBlock();

        if (!block) {
            console.log("Aucun bloc reçu.");
            return;
        }

        const tokens = detectNewTokens(block);

        console.log("Tokens détectés :", tokens.length);
        console.log("----------------------------------------");

        for (const token of tokens) {

            try {

                const metadata = await getTokenMetadata(token.mint);
                const dex = await getTokenData(token.mint) || {};

                const tokenInfo = {

                    mint: token.mint,

                    symbol:
                        dex.symbol ||
                        metadata.symbol ||
                        token.symbol ||
                        "TOKEN",

                    name:
                        dex.name ||
                        metadata.name ||
                        token.name ||
                        "Unknown Token",

                    image:
                        dex.image ||
                        metadata.image ||
                        "",

                    website:
                        dex.website ||
                        metadata.website ||
                        "",

                    twitter:
                        dex.twitter ||
                        metadata.twitter ||
                        "",

                    telegram:
                        dex.telegram ||
                        metadata.telegram ||
                        "",

                    price: dex.price || 0,
                    liquidity: dex.liquidity || 0,
                    marketCap: dex.marketCap || 0,
                    volume24h: dex.volume24h || 0,

                    holders: token.holders || 0
                };

                const risk = analyzeRisk(tokenInfo);

                let score = 100 - risk.score;

                if (score < 0)
                    score = 0;

                let signal = "IGNORE";

                if (score >= 90 && risk.level === "LOW") {
                    signal = "STRONG BUY";
                } else if (score >= 75) {
                    signal = "BUY";
                } else if (score >= 50) {
                    signal = "WATCH";
                }

                tokenInfo.score = score;
                tokenInfo.signal = signal;
                tokenInfo.risk = risk.level;

                await saveToken(tokenInfo);

                console.log("🪙", tokenInfo.symbol);
                console.log("Nom        :", tokenInfo.name);
                console.log("Mint       :", tokenInfo.mint);
                console.log("Prix       :", tokenInfo.price);
                console.log("Liquidité  :", tokenInfo.liquidity);
                console.log("Market Cap :", tokenInfo.marketCap);
                console.log("Volume 24h :", tokenInfo.volume24h);
                console.log("Score      :", tokenInfo.score);
                console.log("Signal     :", tokenInfo.signal);
                console.log("Risk       :", tokenInfo.risk);

                if (risk.reasons && risk.reasons.length > 0) {
                    console.log("Risques    :", risk.reasons.join(", "));
                }

                console.log("----------------------------------------");

            } catch (err) {

                console.error("Erreur token :", token.mint);
                console.error(err.message);
                console.log("----------------------------------------");

            }

        }

        console.log("✅ Scan terminé");

    } catch (err) {

        console.error("Erreur Scanner :", err.message);

    }
}

module.exports = {
    scanLatestBlock
};

