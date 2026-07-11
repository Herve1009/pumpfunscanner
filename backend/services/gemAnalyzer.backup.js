function getGemScore(token) {

    let score = 0;

    // Liquidité
    if (token.liquidity >= 100000)
        score += 25;
    else if (token.liquidity >= 50000)
        score += 20;
    else if (token.liquidity >= 20000)
        score += 15;
    else if (token.liquidity >= 10000)
        score += 10;

    // Volume
    if (token.volume24h >= 1000000)
        score += 25;
    else if (token.volume24h >= 250000)
        score += 20;
    else if (token.volume24h >= 50000)
        score += 15;
    else if (token.volume24h >= 10000)
        score += 10;

    // Market Cap
    if (token.marketCap >= 100000 && token.marketCap <= 5000000)
        score += 20;
    else if (token.marketCap >= 50000)
        score += 10;

    // Répartition des holders
    if (token.top10Percentage <= 50)
        score += 15;
    else if (token.top10Percentage <= 70)
        score += 10;
    else if (token.top10Percentage <= 85)
        score += 5;

    // Développeur
    if (token.devScore >= 95)
        score += 15;
    else if (token.devScore >= 80)
        score += 10;

    if (score > 100)
        score = 100;

    return score;

}

function getPotential(score) {

    if (score >= 95)
        return "🔥 x100";

    if (score >= 85)
        return "🚀 x50";

    if (score >= 75)
        return "🟢 x10";

    if (score >= 60)
        return "🟡 x5";

    return "⚪ x2";

}

module.exports = {

    getGemScore,
    getPotential

};
