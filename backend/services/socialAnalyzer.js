function analyzeSocial(data = {}) {

    let score = 0;

    if (data.telegramMembers) {

        if (data.telegramMembers > 10000)
            score += 30;

        else if (data.telegramMembers > 1000)
            score += 15;
    }

    if (data.whatsappActivity) {

        score += Math.min(
            data.whatsappActivity,
            20
        );
    }

    if (data.xFollowers) {

        if (data.xFollowers > 10000)
            score += 30;

        else if (data.xFollowers > 1000)
            score += 15;
    }

    if (data.tiktokViews) {

        if (data.tiktokViews > 100000)
            score += 20;

        else if (data.tiktokViews > 10000)
            score += 10;
    }

    if (score > 100)
        score = 100;

    return score;
}

module.exports = {
    analyzeSocial
};
