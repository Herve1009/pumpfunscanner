const logger = require("./logger");
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

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors({ origin: "*" }));
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300
});
app.use(limiter);
app.use(morgan("combined"));


// Sert les fichiers du dossier public
app.use(express.static("public"));

// Page d'accueil
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
app.use("/api/tokens", tokenRoutes);
app.use("/api/top", topRoutes);

// Initialisation PostgreSQL
(async () => {
    try {
        await initDatabase();
    } catch (err) {
        logger.error("Erreur PostgreSQL :", err.message);
    }
})();

// Premier scan
(async () => {
    try {
        await scanLatestBlock();
    } catch (err) {
        logger.error("Erreur scan initial :", err.message);
    }
})();

// Scan toutes les 15 secondes
setInterval(async () => {
    try {
        await scanLatestBlock();
    } catch (err) {
        logger.error("Erreur scan :", err.message);
    }
}, 15000);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info("========================================");
    logger.info("🚀 PumpFunScanner PRO V5");
    logger.info("========================================");
    logger.info(`🌐 Dashboard : http://localhost:${PORT}`);
    logger.info(`📡 API       : http://localhost:${PORT}/api/tokens`);
    logger.info(`❤️ Health    : http://localhost:${PORT}/api/health`);
    logger.info("========================================");
});

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
    logger.error("❌ Global Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// ===== Process Error Handlers =====
process.on("uncaughtException", (err) => {
    logger.error("🔥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
    logger.error("⚠️ Unhandled Rejection:", reason);
});

// ===== Graceful Shutdown =====
async function gracefulShutdown(signal) {
    logger.info(`\n🛑 ${signal} reçu, arrêt en cours...`);

    try {
        logger.info("✅ Arrêt propre terminé.");
        process.exit(0);
    } catch (err) {
        logger.error("❌ Erreur pendant l'arrêt :", err);
        process.exit(1);
    }
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
logger.info("🚀 Logger system activated");
