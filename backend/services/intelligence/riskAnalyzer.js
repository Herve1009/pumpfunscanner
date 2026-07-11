function analyzeRisk(data = {}) {

    let risk = 0;
    let reasons = [];


    // Créateur suspect
    if(data.creatorHistory === "bad"){

        risk += 40;

        reasons.push(
            "creator_risk"
        );

    }


    // Concentration holders
    if(data.topHolderPercent){

        if(data.topHolderPercent > 50){

            risk += 30;

            reasons.push(
                "holder_concentration"
            );

        }

    }


    // Liquidité faible
    if(data.liquidity){

        if(data.liquidity < 5000){

            risk += 20;

            reasons.push(
                "low_liquidity"
            );

        }

    }


    return {

        riskScore:
        Math.min(risk,100),

        level:
            risk >= 70 ? "HIGH" :
            risk >= 40 ? "MEDIUM" :
            "LOW",

        reasons

    };

}


module.exports = {
    analyzeRisk
};
