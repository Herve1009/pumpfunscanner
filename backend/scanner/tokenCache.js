const cache = new Map();

const TTL = 10 * 60 * 1000; // 10 minutes

function isNewToken(mint) {
    const now = Date.now();

    if (cache.has(mint)) {
        const lastSeen = cache.get(mint);

        if (now - lastSeen < TTL) {
            return false;
        }
    }

    cache.set(mint, now);

    return true;
}

function cleanCache() {
    const now = Date.now();

    for (const [mint, time] of cache.entries()) {
        if (now - time > TTL) {
            cache.delete(mint);
        }
    }
}

module.exports = {
    isNewToken,
    cleanCache
};
