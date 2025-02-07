const Portfolio = require("../Models/PortfolioModel");
const { v4: uuidv4 } = require("uuid");

// Create Portfolio
const createPortfolio = async (req, res) => {
    try {
        const { user_id, template_id, data } = req.body;

        if (!user_id || !template_id || !data) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newPortfolio = new Portfolio({
            portfolio_id: uuidv4(),
            user_id,
            template_id,
            data
        });

        const savedPortfolio = await newPortfolio.save();
        res.status(201).json({ message: "Portfolio Created Successfully", portfolio_id: savedPortfolio.portfolio_id });

    } catch (error) {
        console.error("Error creating portfolio:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get a single portfolio by ID
const getPortfolio = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const portfolio = await Portfolio.findOne({ portfolio_id: portfolioId });

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio Not Found" });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a portfolio
const deletePortfolio = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const deletedPortfolio = await Portfolio.findOneAndDelete({ portfolio_id: portfolioId });

        if (!deletedPortfolio) {
            return res.status(404).json({ message: "Portfolio Not Found" });
        }
        res.status(200).json({ message: "Portfolio Deleted Successfully" });
    } catch (error) {
        console.error("Error deleting portfolio:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createPortfolio,
    getPortfolio,
    deletePortfolio
};
