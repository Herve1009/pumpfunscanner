const { calculateScore } = require("./scoreEngine");
const { analyzeRisk } = require("./riskAnalyzer");
const { getGemScore, getPotential } = require("./gemAnalyzer");
const { shouldIgnoreToken } = require("./tokenFilter");

function analyzeToken(tokenInfo) {

    if (shouldIgnoreToken(tokenInfo)) {
        return null;
    }

    const risk = analyzeRisk(tokenInfo);

    let score = calculateScore(tokenInfo);

    if (risk.level === "MEDIUM") score -= 15;
    if (risk.level === "HIGH") score -= 40;

    if (score < 0) score = 0;

    tokenInfo.score = score;
    tokenInfo.gemScore = getGemScore(tokenInfo);
    tokenInfo.potential = getPotential(tokenInfo.gemScore);

    if (tokenInfo.gemScore >= 95)
        tokenInfo.signal = "🚀 STRONG BUY";
    else if (tokenInfo.gemScore >= 75)
        tokenInfo.signal = "🟢 BUY";
    else if (tokenInfo.gemScore >= 50)
        tokenInfo.signal = "🟡 WATCH";
    else
        tokenInfo.signal = "🔴 IGNORE";

    return {
        token: tokenInfo,
        risk
    };
}

module.exports = {
    analyzeToken
};
