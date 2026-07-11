const telegram = require("./telegram");
const whatsapp = require("./whatsapp");
const discord = require("./discord");
const email = require("./email");

async function notify(signal) {

    console.log("\n==============================");
    console.log("🚨 Nouvelle alerte");
    console.log("==============================");

    console.log(signal);

    try {

        await telegram.send(signal);

    } catch (e) {

        console.log("Telegram indisponible");

    }

    try {

        await whatsapp.send(signal);

    } catch (e) {

        console.log("WhatsApp indisponible");

    }

    try {

        await discord.send(signal);

    } catch (e) {

        console.log("Discord indisponible");

    }

    try {

        await email.send(signal);

    } catch (e) {

        console.log("Email indisponible");

    }

}

module.exports = {
    notify
};
