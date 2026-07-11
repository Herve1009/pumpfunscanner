const perf = require("./performanceMonitor");
const cache = require("./tokenCache");
const queue = require("./queueEngine");


function trackTransaction(){

    perf.recordTransaction();

}


function trackToken(mint){

    if(cache.exists(mint)){

        return false;

    }


    cache.add(mint);

    perf.recordToken();

    return true;

}


function addTask(task){

    queue.add(task);

}


module.exports = {

    trackTransaction,
    trackToken,
    addTask

};
