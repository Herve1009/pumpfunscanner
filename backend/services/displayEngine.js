function showHeader(total) {
    console.clear();

    console.log("========================================");
    console.log("🚀 PumpFunScanner PRO V13");
    console.log("========================================");
    console.log(`🕒 ${new Date().toLocaleTimeString()}`);
    console.log(`📦 Tokens détectés : ${total}`);
    console.log("========================================");
}

function showToken(token, risk) {
    console.log("----------------------------------------");
    console.log(`🪙 ${token.symbol}`);
    console.log(`Nom        : ${token.name}`);
    console.log(`Gem Score  : ${token.gemScore}`);
    console.log(`Signal     : ${token.signal}`);
    console.log(`Prix       : ${token.price}`);
    console.log(`Liquidité  : ${token.liquidity}`);
    console.log(`Market Cap : ${token.marketCap}`);
    console.log(`Volume 24h : ${token.volume24h}`);
    console.log(`Risk       : ${risk.level}`);
    console.log("----------------------------------------");
}

function showTop(topTokens) {
    console.log("");
    console.log("🏆 TOP 10 GEMS");
    console.log("========================================");

    topTokens.forEach((token, index) => {
        const medal =
            index === 0 ? "🥇" :
            index === 1 ? "🥈" :
            index === 2 ? "🥉" : "⭐";

        console.log(
            `${medal} ${token.symbol.padEnd(12)} Gem ${String(token.gemScore).padEnd(3)} ${token.signal}`
        );
    });

    console.log("========================================");
}

module.exports = {
    showHeader,
    showToken,
    showTop
};
