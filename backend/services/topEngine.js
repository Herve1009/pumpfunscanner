let topTokens = [];

function addToken(token) {
    if (!token || !token.mint) return;

    const index = topTokens.findIndex(t => t.mint === token.mint);

    if (index >= 0) {
        topTokens[index] = token;
    } else {
        topTokens.push(token);
    }

    topTokens.sort((a, b) => {
        if (b.gemScore !== a.gemScore) {
            return b.gemScore - a.gemScore;
        }
        return b.score - a.score;
    });

    topTokens = topTokens.slice(0, 10);
}

function getTopTokens() {
    return topTokens;
}

function clearTopTokens() {
    topTokens = [];
}

module.exports = {
    addToken,
    getTopTokens,
    clearTopTokens
};
