const fs = require("fs");

const file="server.js";

let code=fs.readFileSync(file,"utf8");


if(!code.includes("/api/ranking")){


code += `

const rankingRoute =
require("./routes/ranking");

app.use(
"/api/ranking",
rankingRoute
);

`;


fs.writeFileSync(
file,
code
);


console.log(
"✅ API Ranking ajoutée"
);


}else{

console.log(
"ℹ️ Route déjà présente"
);

}

