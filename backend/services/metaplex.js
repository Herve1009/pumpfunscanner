const { Connection, PublicKey } = require("@solana/web3.js");
const {
    findMetadataPda,
    fetchMetadataFromSeeds
} = require("@metaplex-foundation/mpl-token-metadata");

const RPC =
    process.env.HELIUS_RPC ||
    "https://api.mainnet-beta.solana.com";

const connection = new Connection(RPC);

async function getMetaplexMetadata(mint) {

    try {

        const mintKey = new PublicKey(mint);

        const metadata = await fetchMetadataFromSeeds(
            connection,
            {
                mint: mintKey
            }
        );

        return {
            name: metadata.name?.trim() || "",
            symbol: metadata.symbol?.trim() || "",
            uri: metadata.uri || ""
        };

    } catch (e) {

        return null;

    }

}

module.exports = {
    getMetaplexMetadata
};
