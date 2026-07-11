const displayedTokens = new Set();

function isNewToken(mint) {
    if (!mint) return false;

    if (displayedTokens.has(mint)) {
        return false;
    }

    displayedTokens.add(mint);
    return true;
}

function clearCache(maxSize = 1000) {
    if (displayedTokens.size >= maxSize) {
        displayedTokens.clear();
        console.log("🧹 Cache des tokens vidé.");
    }
}

function getCacheSize() {
    return displayedTokens.size;
}

module.exports = {
    isNewToken,
    clearCache,
    getCacheSize
};
