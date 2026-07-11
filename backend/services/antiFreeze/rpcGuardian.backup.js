require("dotenv").config();

const axios = require("axios");

const RPC_URL =
process.env.HELIUS_RPC_URL;


async function checkRPC() {

    const start = Date.now();

    try {

        const response = await axios.post(
            RPC_URL,
            {
                jsonrpc: "2.0",
                id: 1,
                method: "getSlot"
            },
            {
                timeout: 10000
            }
        );


        const latency =
            Date.now() - start;


        if (response.data.result) {

            return {
                online: true,
                latency
            };

        }


        return {
            online: false,
            latency
        };


    } catch(error) {

        return {
            online: false,
            error: error.message
        };

    }

}


module.exports = {
    checkRPC
};
