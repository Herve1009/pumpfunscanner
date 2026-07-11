const fs = require("fs");

const file = "services/pipelineEngine.js";

let code = fs.readFileSync(file,"utf8");

if (!code.includes("addToken")) {

code = code.replace(
'const { createAlert } = require("./alertEngine");',
`const { createAlert } = require("./alertEngine");
const { addToken } = require("./tokenStore");`
);

code = code.replace(
'return result;',
`addToken(result);

    return result;`
);

fs.writeFileSync(file, code);

console.log("✅ Pipeline connecté au Token Store");

} else {

console.log("ℹ️ Déjà connecté");

}
