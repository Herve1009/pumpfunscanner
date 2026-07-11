
function shouldIgnoreToken(token) {

    if (!token) {
        return true;
    }

    if (!token.mint) {
        return true;
    }

    if (typeof token.mint !== "string") {
        return true;
    }

    if (token.mint.length < 32) {
        return true;
    }

    // Ignore doublons simples
    if (token.ignored) {
        return true;
    }

    return false;
}

module.exports = {
    shouldIgnoreToken
};
