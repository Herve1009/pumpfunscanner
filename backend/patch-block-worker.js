const fs = require("fs");

const file = "scanner/blockScanner.js";

if(!fs.existsSync(file)){
    console.log("❌ blockScanner.js introuvable");
    process.exit(1);
}

let code = fs.readFileSync(file,"utf8");


if(!code.includes("workerEngine")){

    code = code.replace(
        "const",
        "const worker = require('../services/performance/workerEngine');\n\nconst"
    );


    code += `\n\n// Worker Engine démarrage\nworker.startWorkers();\n`;


    fs.writeFileSync(file,code);

    console.log(
        "✅ Worker Engine connecté"
    );

}else{

    console.log(
        "ℹ️ Worker déjà connecté"
    );

}
