const { Connection, PublicKey } = require("@solana/web3.js");
const mpl = require("@metaplex-foundation/mpl-token-metadata");

console.log("Version Metaplex chargée.");

console.log("Fonctions disponibles :");
console.log(Object.keys(mpl));

const connection = new Connection(
    process.env.HELIUS_RPC || "https://api.mainnet-beta.solana.com"
);

console.log("Connexion RPC OK");
