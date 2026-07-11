const fs = require("fs");

const file = "server.js";

if(!fs.existsSync(file)){
 console.log("❌ server.js absent");
 process.exit(1);
}

let code = fs.readFileSync(file,"utf8");

// Nettoyage des espaces problématiques
code = code.replace(/\r\n/g,"\n");

// Évite les doubles déclarations de ranking
code = code.replace(
/const rankingRoute\s*=\s*require\("\.\/routes\/ranking"\);/g,
""
);

// Ajoute proprement la route avant la fin
if(!code.includes('app.use("/api/ranking"')){

 code += `

const rankingRoute = require("./routes/ranking");

app.use("/api/ranking", rankingRoute);

`;

}

fs.writeFileSync(file,code);

console.log("✅ Patch automatique server.js terminé");
