const fs = require("fs");

const file = "services/pipelineEngine.js";

if(!fs.existsSync(file)){
    console.log("❌ pipelineEngine.js introuvable");
    process.exit(1);
}


let code = fs.readFileSync(file,"utf8");


if(!code.includes("opportunityEngine")){


code = code.replace(

'const { createAlert } = require("./alertEngine");',

`const { createAlert } = require("./alertEngine");
const { calculateOpportunity, classify } = require("./intelligence/opportunityEngine");`

);



code = code.replace(

'const result = {',

`const opportunityScore =
        calculateOpportunity({
            gemScore,
            communityScore: socialScore,
            smartMoneyScore: token.smartMoneyScore || 0,
            marketCapScore: token.marketCapScore || 0
        });

    const result = {`

);



code = code.replace(

'socialScore,',

`socialScore,
        opportunityScore,
        opportunityStatus: classify(opportunityScore),`

);



fs.writeFileSync(file,code);


console.log(
"✅ Opportunity Engine connecté au Pipeline"
);


}else{

console.log(
"ℹ️ Intelligence déjà connectée"
);

}
