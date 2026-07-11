const fs = require("fs");

console.log("🔧 AUTO FIX PumpScanner Pro démarré...");

const files = [
    "services/tokenStore.js",
    "services/pipelineEngine.js",
    "services/gemAnalyzer.js",
    "services/socialAnalyzer.js",
    "services/alertEngine.js"
];

for (const file of files) {

    if (fs.existsSync(file)) {
        console.log("✅ OK :", file);
    } else {
        console.log("⚠️ Manquant :", file);
    }
}

// Vérification dossiers
if (!fs.existsSync("services")) {
    fs.mkdirSync("services");
}

console.log("✅ Vérification terminée");
console.log("➡️ Lance ensuite: node --check fichier.js");
