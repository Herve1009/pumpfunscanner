const axios = require("axios");

const API_KEY = process.env.HELIUS_API_KEY;

async function getTokenMetadata(mint) {

    const metadata = {
        mint,
        name: "Unknown Token",
        symbol: "TOKEN",
        description: "",
        image: "",
        website: "",
        twitter: "",
        telegram: ""
    };

    if (!API_KEY) {
        return metadata;
    }

    try {

        const { data } = await axios.post(
            `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`,
            {
                jsonrpc: "2.0",
                id: "1",
                method: "getAsset",
                params: {
                    id: mint
                }
            },
            {
                timeout: 10000,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const result = data.result;

        if (!result) return metadata;

        metadata.name =
            result.content?.metadata?.name ||
            metadata.name;

        metadata.symbol =
            result.content?.metadata?.symbol ||
            metadata.symbol;

        metadata.description =
            result.content?.metadata?.description || "";

        metadata.image =
            result.content?.links?.image || "";

        const files = result.content?.files || [];

        if (files.length > 0 && !metadata.image) {
            metadata.image = files[0].uri || "";
        }

        return metadata;

    } catch (err) {

        return metadata;

    }

}

module.exports = {
    getTokenMetadata
};
