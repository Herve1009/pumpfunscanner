require("dotenv").config();\n
const { analyzeProject } = require("../social/socialEngine");
const { calculateMomentum } = require("../social/momentumEngine");
const { analyzeGem } = require("../engine/gemFinder");
const { calculateOpportunityScore } = require("../engine/opportunityRanker");
const { processAlerts } = require("../engine/alertEngine");

const { analyzeProject } = require("../social/socialEngine");

const { getCurrentBlock } = require("../services/helius");
const { detectNewTokens } = require("./tokenDetector");

const { getTokenMetadata } = require("../services/tokenMetadata");
const { getTokenData } = require("../services/dexscreener");
const { getHolderStats } = require("../services/holderAnalyzer");
const { getDeveloperScore } = require("../services/devAnalyzer");
const { getWhaleActivity } = require("../services/whaleAnalyzer");

const { calculateScore } = require("../services/scoreEngine");
const { analyzeRisk } = require("../services/riskAnalyzer");
const { saveToken } = require("../services/tokenRepository");

const displayedTokens = new Set();

const {
    getGemScore,
    getPotential
} = require("../services/gemAnalyzer");

const { shouldIgnoreToken } =
    require("../services/tokenFilter");

    require("../services/tokenStorage");

let topTokens = [];

async function scanLatestBlock() {

    try {

        const block = await getCurrentBlock();

        if (!block) {

            console.log("Aucun bloc reçu.");
            return;

        }

        const tokens = [
            ...new Map(
                detectNewTokens(block).map(token => [
                    token.mint,
                    token
                ])
            ).values()
        ];

        console.clear();

        console.log("========================================");
        console.log("🚀 PumpFunScanner PRO V12");
        console.log("========================================");
        console.log("🌐 Dashboard : http://localhost:3000");
        console.log("📡 API       : http://localhost:3000/api/tokens");
        console.log("❤️ Health    : http://localhost:3000/api/health");
        console.log("========================================");

        console.log(
            `Tokens détectés : ${tokens.length}`
        );

        console.log("----------------------------------------");

        for (const token of tokens) {

                if (displayedTokens.has(token.mint)) {
                    continue;
                }

                displayedTokens.add(token.mint);

            try {
const metadata =
                    await getTokenMetadata(
                        token.mint
                    );

                const dex =
                    await getTokenData(
                        token.mint
                    ) || {};

                const holders =
                    await getHolderStats(
                        token.mint
                    );

                const dev =
                    await getDeveloperScore(
                        token.creator || ""
                    );

                const whale =
                    await getWhaleActivity(
                        token.mint
                    );

                const tokenInfo = {

                    mint: token.mint,

                    creator:
                        token.creator || "",

                    symbol:
                        metadata?.symbol ||
                        token.symbol ||
                        "TOKEN",

                    name:
                        metadata?.name ||
                        token.name ||
                        "Unknown",

                    price:
                        dex.price || 0,

                    liquidity:
                        dex.liquidity || 0,

                    marketCap:
                        dex.marketCap || 0,

                    volume24h:
                        dex.volume24h || 0,

                    holders:
                        holders.holders || 0,

                    top10Percentage:
                        holders.top10Percentage || 100,

                    whales:
                        whale.whales || 0,

                    whaleSupply:
                        whale.whaleSupply || 0,

                    devScore:
                        dev.score || 50,

                    devRisk:
                        dev.risk || "UNKNOWN"

                };

                if (
                    shouldIgnoreToken(tokenInfo)
                ) {

                    continue;

                }

                const risk =
                    analyzeRisk(tokenInfo);

                let score =
                    calculateScore(tokenInfo);

                if (
                    risk.level === "MEDIUM"
                ) {

                    score -= 15;

                }

                if (
                    risk.level === "HIGH"
                ) {

                    score -= 40;

                }

                if (score < 0)
                    score = 0;

                tokenInfo.score = score;
tokenInfo.gemScore =
                    getGemScore(tokenInfo);

                tokenInfo.potential =
                    getPotential(
                        tokenInfo.gemScore
                    );

                if (tokenInfo.gemScore >= 95) {

                    tokenInfo.signal =
                        "🚀 STRONG BUY";

                } else if (
                    tokenInfo.gemScore >= 75
                ) {

                    tokenInfo.signal =
                        "🟢 BUY";

                } else if (
                    tokenInfo.gemScore >= 50
                ) {

                    tokenInfo.signal =
                        "🟡 WATCH";

                } else {

                    tokenInfo.signal =
                        "🔴 IGNORE";

                }

                

// ===============================
// SOCIAL INTELLIGENCE ENGINE
// ===============================

for (const token of tokens) {

    try {

        console.log("🌐 Social analysis:", token.mint);

        const socialData = await analyzeProject({
            mint: token.mint,
            name: token.name || "Unknown",
            website: token.website,
            telegram: token.telegram,
            twitter: token.twitter,
            tiktok: token.tiktok
        });

        token.social = socialData;

        console.log(
            "📊 Social Score:",
            socialData.socialScore
        );

    } catch(err) {

        console.log(
            "⚠️ Social engine error:",
            err.message
        );

        token.social = {
            socialScore:0
        };
    }
}


await saveToken(tokenInfo);

                topTokens.push(tokenInfo);

                topTokens.sort(
                    (a, b) =>
                        b.gemScore -
                        a.gemScore
                );

                if (topTokens.length > 10) {

                    topTokens =
                        topTokens.slice(0, 10);

                }

                console.log(
                    `✅ ${tokenInfo.symbol} | ${tokenInfo.gemScore} | ${tokenInfo.signal}`
                );

                console.log(
                    "----------------------------------------"
                );

                console.log(
                    `🪙 ${tokenInfo.symbol}`
                );

                console.log(
                    `Nom        : ${tokenInfo.name}`
                );

                console.log(
                    `Mint       : ${tokenInfo.mint}`
                );

                console.log(
                    `Prix       : ${tokenInfo.price}`
                );

                console.log(
                    `Liquidité  : ${tokenInfo.liquidity}`
                );

                console.log(
                    `Market Cap : ${tokenInfo.marketCap}`
                );

                console.log(
                    `Volume 24h : ${tokenInfo.volume24h}`
                );
console.log(
                    `Holders    : ${tokenInfo.holders}`
                );

                console.log(
                    `Top10 %    : ${tokenInfo.top10Percentage}`
                );

                console.log(
                    `Whales     : ${tokenInfo.whales}`
                );

                console.log(
                    `Dev Score  : ${tokenInfo.devScore}`
                );

                console.log(
                    `Dev Risk   : ${tokenInfo.devRisk}`
                );

                console.log(
                    `Score      : ${tokenInfo.score}`
                );

                console.log(
                    `Gem Score  : ${tokenInfo.gemScore}`
                );

                console.log(
                    `Potentiel  : ${tokenInfo.potential}`
                );

                console.log(
                    `Signal     : ${tokenInfo.signal}`
                );

                console.log(
                    `Risk       : ${risk.level}`
                );

                console.log(
                    `Risques    : ${risk.reasons.join(", ")}`
                );

                console.log(
                    "----------------------------------------"
                );

            } catch (err) {

                console.error(
                    "Erreur token :",
                    err.message
                );

            }

        }

        if (topTokens.length > 0) {

            console.log("");
            console.log("========================================");
            console.log("🏆 TOP 10 GEMS");
            console.log("========================================");

            topTokens.forEach((token, index) => {

                console.log(
                    `${index + 1}. ${token.symbol} | Gem ${token.gemScore} | ${token.signal}`
                );

            });

            

        if (displayedTokens.size > 1000) {
            displayedTokens.clear();
        }
console.log("========================================");

        }

    } catch (err) {

        console.error(
            "Erreur scan initial :",
            err.message
        );

    }

}
async function startScanner() {

    console.log("🚀 Démarrage du PumpFunScanner PRO V12...");

    while (true) {

        try {

            await scanLatestBlock();

        } catch (err) {

            console.error(
                "Erreur scanner :",
                err.message
            );

        }

        // Pause de 2 secondes
        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

    }

}

module.exports = {

    scanLatestBlock,
    startScanner

};

module.exports = {
    scanLatestBlock,
    startScanner
};
// Démarrage automatique si le fichier est exécuté directement
if (require.main === module) {
    console.log("🚀 PumpScanner PRO démarré...");

    startScanner().catch((err) => {
        console.error("❌ Erreur fatale du scanner :", err);
        process.exit(1);
    });
}

// ===============================
// 🛡️ ANTI-FREEZE PROTECTION
// ===============================

let lastActivity = Date.now();

// heartbeat global
setInterval(() => {
    console.log("💓 Scanner heartbeat OK");
    lastActivity = Date.now();
}, 5000);

// freeze detector
setInterval(() => {
    const now = Date.now();

    // si pas d'activité depuis 20 secondes
    if (now - lastActivity > 20000) {
        console.log("⚠️ FREEZE DETECTED → restarting scanner...");

        process.exit(1); // PM2 redémarre automatiquement
    }
}, 10000);

// sécurité crash capture
process.on("uncaughtException", (err) => {
    console.error("🔥 Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("⚠️ Unhandled Rejection:", err);
    process.exit(1);
});

