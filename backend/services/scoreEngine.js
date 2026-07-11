function calculateScore(token) {

    let score = 0;

    // Liquidité
    if (token.liquidity > 5000) score += 15;
    if (token.liquidity > 20000) score += 10;
    if (token.liquidity > 100000) score += 10;

    // Volume
    if (token.volume24h > 1000) score += 10;
    if (token.volume24h > 10000) score += 10;
    if (token.volume24h > 100000) score += 10;

    // Market Cap
    if (token.marketCap > 50000) score += 10;
    if (token.marketCap > 200000) score += 10;

    // Holders
    if (token.holders > 50) score += 5;
    if (token.holders > 200) score += 5;

    // Achats / ventes
    if ((token.buys24h || 0) > (token.sells24h || 0))
        score += 10;

    if (score > 100)
        score = 100;

    return score;
}

module.exports = {
    calculateScore
};
