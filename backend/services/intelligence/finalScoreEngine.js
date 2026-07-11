function calculateFinalScore(data = {}) {

    const opportunity =
        data.opportunityScore || 0;


    const risk =
        data.riskScore || 0;


    // pénalité risque

    let final =
        opportunity - (risk * 0.5);


    if(final < 0)
        final = 0;


    return Math.round(final);

}



function classify(score){


    if(score >= 85)
        return "🔥 ELITE GEM";


    if(score >= 70)
        return "🚀 HIGH POTENTIAL";


    if(score >= 50)
        return "👀 WATCH";


    return "⚠️ LOW";

}



module.exports = {

    calculateFinalScore,

    classify

};
