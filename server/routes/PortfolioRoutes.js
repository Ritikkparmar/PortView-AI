const express = require("express");
const router = express.Router();

const { 
    createPortfolio, 
    getPortfolio, 
    deletePortfolio 
} = require("../Controllers/PortfolioController");

router.post("/", createPortfolio);
router.get("/:portfolioId", getPortfolio);
router.delete("/:portfolioId", deletePortfolio);

module.exports = router;
