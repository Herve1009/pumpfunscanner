let lastHeartbeat = Date.now();

function beat() {
    lastHeartbeat = Date.now();
}

function getLastHeartbeat() {
    return lastHeartbeat;
}

function heartbeatAge() {
    return Date.now() - lastHeartbeat;
}

module.exports = {
    beat,
    getLastHeartbeat,
    heartbeatAge
};
