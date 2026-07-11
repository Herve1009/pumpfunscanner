
function getGemScore(data = {}) {

    let score = 0;

    // vitesse de détection
    if (data.ageSeconds !== undefined) {

        if (data.ageSeconds < 60)
            score += 20;

        else if (data.ageSeconds < 300)
            score += 10;
    }

    // volume
    if (data.volume) {

        if (data.volume > 50000)
            score += 25;

        else if (data.volume > 10000)
            score += 15;
    }

    // holders
    if (data.holders) {

        if (data.holders > 500)
            score += 20;

        else if (data.holders > 100)
            score += 10;
    }

    // communauté sociale
    if (data.socialScore) {

        score += Math.min(
            data.socialScore,
            20
        );
    }

    // limite 100
    if (score > 100)
        score = 100;

    return score;
}


function getPotential(score) {

    if (score >= 80)
        return "HIGH_POTENTIAL";

    if (score >= 60)
        return "PROMISING";

    if (score >= 30)
        return "WATCH";

    return "LOW";
}


module.exports = {
    getGemScore,
    getPotential
};
