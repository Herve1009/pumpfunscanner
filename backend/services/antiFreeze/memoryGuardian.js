const os = require("os");

const LIMIT_MB = 700;
const CRITICAL_MB = 900;

function getMemoryStatus() {

    const mem = process.memoryUsage();

    const heapMB = Math.round(mem.heapUsed / 1024 / 1024);

    const rssMB = Math.round(mem.rss / 1024 / 1024);

    return {
        heapMB,
        rssMB,
        healthy: rssMB < LIMIT_MB,
        critical: rssMB >= CRITICAL_MB
    };
}

function logMemory() {

    const status = getMemoryStatus();

    console.log(
        `🧠 RAM: ${status.rssMB} MB | Heap: ${status.heapMB} MB`
    );

    if (status.critical) {

        console.log(
            "⚠️ Memory Guardian : mémoire critique"
        );

    }

    return status;
}

module.exports = {
    getMemoryStatus,
    logMemory
};
