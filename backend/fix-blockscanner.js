const fs = require("fs");

const file = "scanner/blockScanner.js";
const backup = "scanner/blockScanner.before-fix.js";

console.log("🔧 BlockScanner Auto Fix démarré...");

if (!fs.existsSync(file)) {
    console.log("❌ blockScanner.js introuvable");
    process.exit(1);
}

// sauvegarde
fs.copyFileSync(file, backup);
console.log("✅ Sauvegarde créée:", backup);

let code = fs.readFileSync(file, "utf8");

// corrections communes d'injection
code = code.replace(
    /const cors = require\("cors"\);/g,
    ""
);

code = code.replace(
    /\n{3,}/g,
    "\n\n"
);

// suppression des fins de fichier injectées incorrectement
code = code.replace(
    /\/\/ ===============================[\s\S]*$/m,
    ""
);

// vérification export propre
if (!code.includes("module.exports")) {
    code += `\n\nmodule.exports = { scanLatestBlock, startScanner };\n`;
}

fs.writeFileSync(file, code);

console.log("✅ Correction appliquée");
