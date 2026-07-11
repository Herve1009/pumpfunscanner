class Signal {
    constructor({
        symbol,
        mint,
        score,
        signal,
        price,
        liquidity,
        volume,
        holders,
        marketCap,
        age,
        pumpfun,
        dexscreener,
        birdeye
    }) {
        this.symbol = symbol || "";
        this.mint = mint || "";
        this.score = score || 0;
        this.signal = signal || "WATCH";
        this.price = price || 0;
        this.liquidity = liquidity || 0;
        this.volume = volume || 0;
        this.holders = holders || 0;
        this.marketCap = marketCap || 0;
        this.age = age || "";
        this.pumpfun = pumpfun || "";
        this.dexscreener = dexscreener || "";
        this.birdeye = birdeye || "";
        this.createdAt = new Date().toISOString();
    }
}

module.exports = Signal;
