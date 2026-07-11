function shouldAlert(token = {}) {

    const score = token.gemScore || 0;
    const social = token.socialScore || 0;

    if (score >= 80 && social >= 50) {
        return {
            alert: true,
            level: "HIGH"
        };
    }

    if (score >= 60) {
        return {
            alert: true,
            level: "MEDIUM"
        };
    }

    return {
        alert: false,
        level: "LOW"
    };
}


function createAlert(token) {

    const result = shouldAlert(token);

    if (!result.alert)
        return null;

    return {
        token: token.mint,
        level: result.level,
        score: token.gemScore,
        time: Date.now()
    };
}


module.exports = {
    shouldAlert,
    createAlert
};
