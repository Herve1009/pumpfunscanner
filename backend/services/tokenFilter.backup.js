function shouldIgnoreToken(token) {

    // Mint invalide
    if (!token.mint)
        return true;

    // Liquidité trop faible
    if ((token.liquidity || 0) < 5000)
        return true;

    // Market Cap trop faible
    if ((token.marketCap || 0) < 20000)
        return true;

    // Volume quasi nul
    if ((token.volume24h || 0) < 5000)
        return true;

    // Peu de holders
    if ((token.holders || 0) < 15)
        return true;

    // Concentration excessive
    if ((token.top10Percentage || 100) > 95)
        return true;

    // Développeur très risqué
    if ((token.devScore || 0) < 40)
        return true;

    return false;

}

module.exports = {
    shouldIgnoreToken
};
