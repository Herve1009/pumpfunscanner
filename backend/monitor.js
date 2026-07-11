const os = require("os");
const { exec } = require("child_process");

function getCPU() {
    return os.loadavg()[0];
}

function getRAM() {
    return ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
}

function checkPM2() {
    exec("pm2 jlist", (err, stdout) => {
        if (err) return console.log("PM2 error");

        const processes = JSON.parse(stdout);

        processes.forEach(p => {
            if (p.pm2_env.status !== "online") {
                console.log("🚨 PROCESS DOWN:", p.name);
            }
        });
    });
}

setInterval(() => {
    console.log("📊 CPU:", getCPU());
    console.log("📊 RAM:", getRAM().toFixed(2) + "%");

    checkPM2();

}, 10000);
