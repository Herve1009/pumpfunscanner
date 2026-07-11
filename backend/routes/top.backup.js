const express = require("express");
const router = express.Router();
const { getTopTokens } = require("../services/tokenRepository");

router.get("/", async (req, res) => {
    try {
        const tokens = await getTopTokens(10);
        res.json(tokens);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
