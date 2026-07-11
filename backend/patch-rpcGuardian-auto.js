const fs = require("fs");

const file = "services/antiFreeze/rpcGuardian.js";

if (!fs.existsSync(file)) {
    console.log("❌ rpcGuardian.js introuvable");
    process.exit(1);
}

fs.copyFileSync(
    file,
    "services/antiFreeze/rpcGuardian.backup.js"
);

const code = `
require("dotenv").config();

const axios = require("axios");

function getRpcUrl(){

    if(process.env.HELIUS_RPC_URL){
        return process.env.HELIUS_RPC_URL;
    }

    if(process.env.HELIUS_API_KEY){
        return \`https://mainnet.helius-rpc.com/?api-key=\${process.env.HELIUS_API_KEY}\`;
    }

    return null;
}


async function checkRPC(){

    const RPC_URL = getRpcUrl();

    if(!RPC_URL){

        return {
            online:false,
            error:"RPC URL missing"
        };

    }


    try{

        const start = Date.now();

        const response = await axios.post(
            RPC_URL,
            {
                jsonrpc:"2.0",
                id:1,
                method:"getSlot"
            },
            {
                timeout:10000
            }
        );


        return {
            online:!!response.data.result,
            latency:Date.now()-start
        };


    }catch(error){

        return {
            online:false,
            error:error.message
        };

    }

}


module.exports={
    checkRPC
};
`;

fs.writeFileSync(file, code);

console.log("✅ RPC Guardian révisé automatiquement");
console.log("Backup créé");
