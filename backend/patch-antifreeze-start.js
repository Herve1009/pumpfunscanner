const fs = require("fs");

const file = "server.js";

if(!fs.existsSync(file)){
    console.log("❌ server.js introuvable");
    process.exit(1);
}

let code = fs.readFileSync(file,"utf8");

if(!code.includes("startMonitor")){

    code = code.replace(
        "require(",
        "const { startMonitor } = require('./services/antiFreeze/monitor');\n\nrequire("
    );

    code += `\n\n// AntiFreeze Engine\nstartMonitor();\n`;

    fs.writeFileSync(file, code);

    console.log("✅ AntiFreeze connecté au serveur");

}else{

    console.log("ℹ️ AntiFreeze déjà connecté");

}
