const { execSync } = require("child_process");

console.log("🔧 PUMP SCANNER AUTO FIX START");

// 1. install deps
try {
    console.log("📦 Installing dependencies...");
    execSync("npm install", { stdio: "inherit" });
} catch (e) {
    console.log("❌ npm install error");
}

// 2. restart pm2
try {
    console.log("🔁 Restarting PM2...");
    execSync("pm2 restart all", { stdio: "inherit" });
} catch (e) {
    console.log("❌ PM2 restart error");
}

// 3. check server
try {
    console.log("🌐 Testing API...");
    execSync("curl http://127.0.0.1:3000/api/health", { stdio: "inherit" });
} catch (e) {
    console.log("❌ API not responding");
}

console.log("✅ AUTO FIX COMPLETE");
