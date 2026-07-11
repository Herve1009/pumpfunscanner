const { startMonitor } = require("./services/antiFreeze/monitor");

require("./logger");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const tokenRoutes = require("./routes/tokens");
const topRoutes = require("./routes/top");
const { scanLatestBlock } = require("./scanner/blockScanner");
const { initDatabase } = require("./database/database");

const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300
});

// Sert les fichiers du dossier public
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Vérification API
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "online",
        version: "5.0"
    });
});

// API Tokens
// Initialisation PostgreSQL
(async () => {
    try {
        await initDatabase();
    } catch (err) {
        console.error("Erreur PostgreSQL :", err.message);
    }
})();

// Premier scan
(async () => {
    try {
        await scanLatestBlock();
    } catch (err) {
        console.error("Erreur scan initial :", err.message);
    }
})();

// Scan toutes les 15 secondes
setInterval(async () => {
    try {
        await scanLatestBlock();
    } catch (err) {
        console.error("Erreur scan :", err.message);
    }
}, 15000);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.info("========================================");
    console.info("🚀 PumpFunScanner PRO V5");
    console.info("========================================");
    console.info(`🌐 Dashboard : http://localhost:${PORT}`);
    console.info(`📡 API       : http://localhost:${PORT}/api/tokens`);
    console.info(`❤️ Health    : http://localhost:${PORT}/api/health`);
    console.info("========================================");
});

// ===== Global Error Handler =====
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// ===== Process Error Handlers =====
process.on("uncaughtException", (err) => {
    console.error("🔥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
    console.error("⚠️ Unhandled Rejection:", reason);
});

// ===== Graceful Shutdown =====
async function gracefulShutdown(signal) {
    console.info(`\n🛑 ${signal} reçu, arrêt en cours...`);

    try {
        console.info("✅ Arrêt propre terminé.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Erreur pendant l'arrêt :", err);
        process.exit(1);
    }
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
console.info("🚀 Logger system activated");


// AntiFreeze Engine
startMonitor();







const rankingRoute = require("./routes/ranking");

