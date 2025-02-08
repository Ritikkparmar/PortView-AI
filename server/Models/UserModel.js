const mongoose = require('mongoose')
const PortfolioSchema=require('PortfolioModel')
const userSchema = new mongoose.Schema(
    {
        FirstName: String,
        LastName: String,
        UserId:Number,
        name: { type: String, required: true },
        picture: String,
        email: { type: String, required: true },
        portfolios: Array,
        profile: PortfolioSchema
    }
)

const Users = mongoose.model("Users", userSchema);

module.exports = Users