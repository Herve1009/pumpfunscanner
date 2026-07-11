const cache = new Map();

const EXPIRATION = 60 * 60 * 1000; // 1 heure


function add(mint) {

    cache.set(
        mint,
        Date.now()
    );

}


function exists(mint) {

    if(!cache.has(mint))
        return false;


    const time =
        cache.get(mint);


    if(Date.now() - time > EXPIRATION){

        cache.delete(mint);

        return false;
    }


    return true;

}


function size(){

    return cache.size;

}


function clear(){

    cache.clear();

}


module.exports = {
    add,
    exists,
    size,
    clear
};
