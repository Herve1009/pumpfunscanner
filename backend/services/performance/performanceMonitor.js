const stats = {

    transactions: 0,
    tokens: 0,
    errors: 0,
    startTime: Date.now()

};


function recordTransaction(){

    stats.transactions++;

}


function recordToken(){

    stats.tokens++;

}


function recordError(){

    stats.errors++;

}


function getStats(){

    const uptime =
        Date.now() - stats.startTime;


    return {

        ...stats,

        uptimeSeconds:
        Math.floor(uptime / 1000)

    };

}


function logStats(){

    console.log(
        "📊 Performance:",
        getStats()
    );

}


module.exports = {

    recordTransaction,
    recordToken,
    recordError,
    getStats,
    logStats

};
