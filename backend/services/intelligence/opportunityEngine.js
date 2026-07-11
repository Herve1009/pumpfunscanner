function calculateOpportunity(data = {}) {

    let score = 0;


    // Gem Score (40%)
    if(data.gemScore){

        score +=
        data.gemScore * 0.40;

    }


    // Community Score (25%)
    if(data.communityScore){

        score +=
        data.communityScore * 0.25;

    }


    // Smart Money (20%)
    if(data.smartMoneyScore){

        score +=
        data.smartMoneyScore * 0.20;

    }


    // Market Cap early bonus (15%)
    if(data.marketCapScore){

        score +=
        data.marketCapScore * 0.15;

    }


    return Math.round(
        Math.min(score,100)
    );

}



function classify(score){

    if(score >= 90)
        return "🔥 GEM";

    if(score >= 70)
        return "🚀 STRONG";

    if(score >= 50)
        return "👀 WATCH";

    return "⚠️ LOW";

}



module.exports = {

    calculateOpportunity,

    classify

};
