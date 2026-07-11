const tokens = [];

function addToken(token) {

    tokens.unshift(token);

    // garder seulement les 100 derniers
    if (tokens.length > 100) {
        tokens.pop();
    }

}


function getTopTokens() {

    return tokens
        .sort((a,b) =>
            (b.gemScore || 0) -
            (a.gemScore || 0)
        );

}


module.exports = {
    addToken,
    getTopTokens
};
