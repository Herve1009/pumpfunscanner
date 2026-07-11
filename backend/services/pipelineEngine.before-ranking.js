const { shouldIgnoreToken } = require("./tokenFilter");
const { getGemScore } = require("./gemAnalyzer");
const { analyzeSocial } = require("./socialAnalyzer");
const { createAlert } = require("./alertEngine");
const { calculateOpportunity, classify } = require("./intelligence/opportunityEngine");
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
            smartMoneyScore: token.smartMoneyScore || 0,
            marketCapScore: token.marketCapScore || 0
        });

    const result = {
        ...token,
        socialScore,
        gemScore,
        alert: null
    };

    result.alert = createAlert(result);

    addToken(result);

    return result;
}


module.exports = {
    processToken
};
