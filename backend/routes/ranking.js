const express = require("express");

const router = express.Router();

const {
    getRanking
} = require("../services/intelligence/rankingEngine");


router.get("/", (req,res)=>{

    try{

        const ranking =
            getRanking();


        res.json({

            success:true,

            count:
            ranking.length,

            ranking

        });


    }catch(error){


        res.status(500).json({

            success:false,

            error:error.message

        });


    }

});


module.exports = router;
