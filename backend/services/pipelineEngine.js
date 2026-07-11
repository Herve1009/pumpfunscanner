const { shouldIgnoreToken } = require("./tokenFilter");
const { getGemScore } = require("./gemAnalyzer");
const { analyzeSocial } = require("./socialAnalyzer");
const { createAlert } = require("./alertEngine");
const { calculateOpportunity, classify } = require("./intelligence/opportunityEngine");
const { calculateFinalScore, classify: finalClassify } = require("./intelligence/finalScoreEngine");
const { addToken } = require("./intelligence/rankingEngine");
const { addToken } = require("./tokenStore");


function processToken(token) {

    if (shouldIgnoreToken(token)) {
        return null;
    }

    const socialScore = analyzeSocial(
        token.social || {}
    );

    const gemScore = getGemScore({
        ...token,
        socialScore
    });

    const opportunityScore =
        calculateOpportunity({
            gemScore,
            communityScore: socialScore,
        opportunityScore,
        opportunityStatus: classify(opportunityScore),
        finalScore,
        finalStatus: finalClassify(finalScore),
            smartMoneyScore: token.smartMoneyScore || 0,
            marketCapScore: token.marketCapScore || 0
        });

    const finalScore =
        calculateFinalScore({
            opportunityScore,
            riskScore: token.riskScore || 0
        });


    const result = {
        ...token,
        socialScore,
        gemScore,
        alert: null
    };

    result.alert = createAlert(result);

    addToken(result);

    addToken(result);

    return result;
}


module.exports = {
    processToken
};
