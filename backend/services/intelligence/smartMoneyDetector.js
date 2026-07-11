const wallets = new Map();


function registerWallet(address, data = {}) {

    wallets.set(address, {

        buys: data.buys || 0,

        wins: data.wins || 0,

        volume: data.volume || 0

    });

}



function getWalletScore(address) {

    const wallet =
        wallets.get(address);


    if(!wallet)
        return 0;


    let score = 0;


    if(wallet.wins > 10)
        score += 40;

    else if(wallet.wins > 3)
        score += 20;


    if(wallet.volume > 100000)
        score += 30;


    if(wallet.buys > 20)
        score += 20;


    return Math.min(score,100);

}



function analyzeBuyer(address){

    return {

        wallet: address,

        smartScore:
        getWalletScore(address)

    };

}


module.exports = {

    registerWallet,

    getWalletScore,

    analyzeBuyer

};
