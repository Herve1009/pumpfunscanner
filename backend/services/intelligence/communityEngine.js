function analyzeCommunity(data = {}) {

    let score = 0;


    // Telegram
    if(data.telegramMembers){

        if(data.telegramMembers > 10000)
            score += 25;

        else if(data.telegramMembers > 1000)
            score += 15;
    }


    // X / Twitter
    if(data.xFollowers){

        if(data.xFollowers > 20000)
            score += 25;

        else if(data.xFollowers > 5000)
            score += 15;
    }


    // TikTok
    if(data.tiktokViews){

        if(data.tiktokViews > 500000)
            score += 30;

        else if(data.tiktokViews > 50000)
            score += 15;
    }


    // WhatsApp activity
    if(data.whatsappActivity){

        score += Math.min(
            data.whatsappActivity,
            20
        );

    }


    return {

        score: Math.min(score,100),

        category:
            score >= 80 ? "VIRAL" :
            score >= 50 ? "STRONG" :
            score >= 25 ? "ACTIVE" :
            "LOW"

    };

}


module.exports = {
    analyzeCommunity
};
