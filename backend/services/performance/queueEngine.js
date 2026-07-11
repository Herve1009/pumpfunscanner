const queue = [];

let processing = false;


function add(task) {

    queue.push(task);

    processQueue();

}


async function processQueue(){

    if(processing)
        return;


    processing = true;


    while(queue.length > 0){

        const task = queue.shift();


        try {

            await task();

        } catch(error){

            console.log(
                "⚠️ Queue Error:",
                error.message
            );

        }

    }


    processing = false;

}


function size(){

    return queue.length;

}


module.exports = {
    add,
    size
};
