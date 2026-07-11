const express = require("express");
const router = express.Router();

const { getTopTokens } = require("../services/tokenStore");

router.get("/", (req, res) => {

    try {

        const tokens = getTopTokens();

        res.json({
            success: true,
            count: tokens.length,
            tokens
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

module.exports = router;
