require("dotenv").config();

async function sendNotification(message) {

    console.log(
        "🔔 NOTIFICATION:",
        message
    );

    // Telegram sera connecté dans l'étape suivante

    return true;
}


module.exports = {
    sendNotification
};
