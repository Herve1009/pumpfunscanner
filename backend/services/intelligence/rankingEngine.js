const rankedTokens = [];


function addToken(token){

    rankedTokens.push(token);

    // garder seulement les 200 derniers
    if(rankedTokens.length > 200){

        rankedTokens.shift();

    }

}



function getRanking(){

    return rankedTokens
        .sort((a,b)=>{

            return (
                (b.finalScore || 0)
                -
                (a.finalScore || 0)
            );

        })
        .slice(0,10);

}



function clear(){

    rankedTokens.length = 0;

}



module.exports = {

    addToken,
    getRanking,
    clear

};
