const fs = require("fs");

const file =
"services/pipelineEngine.js";


if(!fs.existsSync(file)){

 console.log(
 "❌ pipelineEngine.js introuvable"
 );

 process.exit(1);

}


let code =
fs.readFileSync(file,"utf8");


if(!code.includes("rankingEngine")){


code = code.replace(

'const { calculateOpportunity, classify } = require("./intelligence/opportunityEngine");',

`const { calculateOpportunity, classify } = require("./intelligence/opportunityEngine");
const { calculateFinalScore, classify: finalClassify } = require("./intelligence/finalScoreEngine");
const { addToken } = require("./intelligence/rankingEngine");`

);



code = code.replace(

'const result = {',

`const finalScore =
        calculateFinalScore({
            opportunityScore,
            riskScore: token.riskScore || 0
        });


    const result = {`

);



code = code.replace(

'opportunityStatus: classify(opportunityScore),',

`opportunityStatus: classify(opportunityScore),
        finalScore,
        finalStatus: finalClassify(finalScore),`

);



code = code.replace(

'return result;',

`addToken(result);

    return result;`

);



fs.writeFileSync(
file,
code
);


console.log(
"✅ Ranking Engine connecté"
);


}else{

console.log(
"ℹ️ Ranking déjà connecté"
);

}

