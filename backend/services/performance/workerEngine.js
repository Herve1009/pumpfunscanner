const queue = require("./queueEngine");

const WORKERS = 3;

function startWorkers(){

    console.log(
        `⚡ ${WORKERS} workers actifs`
    );

}


function submit(task){

    queue.add(task);

}


module.exports = {
    startWorkers,
    submit
};
