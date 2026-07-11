const fs = require("fs");

const file = "services/helius.js";

if (!fs.existsSync(file)) {
    console.log("❌ services/helius.js introuvable");
    process.exit(1);
}

const code = `require("dotenv").config();

const axios = require("axios");

const RPC_URL =
\`https://mainnet.helius-rpc.com/?api-key=\${process.env.HELIUS_API_KEY}\`;

async function getCurrentBlock() {

    try {

        const response = await axios.post(
            RPC_URL,
            {
                jsonrpc: "2.0",
                id: 1,
                method: "getSlot"
            },
            {
                timeout: 10000
            }
        );

        if (!response.data.result) {
            console.log("⚠️ Helius: aucun slot reçu");
            return null;
        }

        return {
            slot: response.data.result
        };

    } catch(error) {

        console.log(
            "❌ Helius RPC error:",
            error.message
        );

        return null;
    }
}

module.exports = {
    getCurrentBlock
};
`;

fs.writeFileSync(file, code);

console.log("✅ Helius corrigé automatiquement");
