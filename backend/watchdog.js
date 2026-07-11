const { exec } = require("child_process");

setInterval(() => {
    exec("pm2 list", (err, stdout) => {
        if (stdout && stdout.includes("errored")) {
            console.log("⚠️ Process error detected → restarting...");
            exec("pm2 restart pump-scanner");
        }
    });
}, 10000);

console.log("🛡️ Watchdog activated");
