const { heartbeatAge } = require("./heartbeat");

const TIMEOUT = 90000;

function scannerFrozen() {
    return heartbeatAge() > TIMEOUT;
}

module.exports = {
    scannerFrozen
};
