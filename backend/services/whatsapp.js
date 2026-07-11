const axios = require("axios");

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const TO = process.env.WHATSAPP_TO;

async function sendWhatsApp(message) {

    if (!TOKEN || !PHONE_ID || !TO) {
        console.log("WhatsApp non configuré.");
        return;
    }

    try {

        await axios.post(
            `https://graph.facebook.com/v23.0/${PHONE_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: TO,
                type: "text",
                text: {
                    body: message
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ Alerte WhatsApp envoyée");

    } catch (err) {

        console.error(
            "Erreur WhatsApp :",
            err.response?.data || err.message
        );

    }

}

module.exports = {
    sendWhatsApp
};
