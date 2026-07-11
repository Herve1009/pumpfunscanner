const {
    heartbeatAge
} = require("./heartbeat");

const {
    getMemoryStatus
} = require("./memoryGuardian");

const {
    checkRPC
} = require("./rpcGuardian");

const {
    scannerFrozen
} = require("./watchdog");

const {
    recover
} = require("./recovery");


async function monitor(){

    console.log("🛡️ AntiFreeze check...");


    const memory =
        getMemoryStatus();


    if(scannerFrozen()){

        console.log(
            "⚠️ Scanner bloqué détecté"
        );

        await recover();

        return;
    }


    if(memory.critical){

        console.log(
            "⚠️ Mémoire critique"
        );

    }


    const rpc =
        await checkRPC();


    if(!rpc.online){

        console.log(
            "⚠️ RPC indisponible"
        );

    }


    console.log(
        "✅ AntiFreeze OK"
    );

}


function startMonitor(){

    setInterval(
        monitor,
        30000
    );

    console.log(
        "🛡️ AntiFreeze Engine démarré"
    );
}


module.exports = {
    startMonitor,
    monitor
};
