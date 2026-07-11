function rankTokens(tokens) {
    return tokens
        .filter(t => t.score >= 70)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
}

module.exports = {
    rankTokens
};
