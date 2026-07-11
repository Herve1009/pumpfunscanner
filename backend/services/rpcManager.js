require("dotenv").config();

const RPCS = [
    process.env.HELIUS_RPC_URL,
    "https://api.mainnet-beta.solana.com"
];

let current = 0;

function getRpc() {
    return RPCS[current];
}

function switchRpc() {
    current = (current + 1) % RPCS.length;
    console.log("🔄 RPC changé :", getRpc());
    return getRpc();
}

module.exports = {
    getRpc,
    switchRpc
};
