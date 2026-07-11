function analyzeMarketCap(marketCap = 0){

    let category = "UNKNOWN";
    let score = 0;


    if(marketCap < 10000){

        category = "EARLY";
        score = 40;

    } else if(marketCap < 100000){

        category = "GROWTH";
        score = 30;

    } else if(marketCap < 1000000){

        category = "ESTABLISHED";
        score = 15;

    } else {

        category = "MATURE";
        score = 5;

    }


    return {
        marketCap,
        category,
        score
    };

}


module.exports = {
    analyzeMarketCap
};
