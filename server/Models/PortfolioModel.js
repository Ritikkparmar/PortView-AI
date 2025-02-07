const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const portfolioSchema = new mongoose.Schema({
  portfolio_id: { type: String, default: uuidv4, unique: true },
  user_id: { type: String, required: true },
  template_id: { type: String, required: true },
  data: {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    socialLinks: {
      website: { type: String, default: "" },
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      behance: { type: String, default: "" },
      dribbble: { type: String, default: "" },
    },
    education: {
      degree: { type: String },
      fieldOfStudy: { type: String },
      institution: { type: String },
      graduationYear: { type: Number },
    },
    workExperience: [
      {
        jobTitle: { type: String },
        organization: { type: String },
        duration: { type: String },
        description: { type: String },
      },
    ],
    achievements: [
      {
        title: { type: String },
        description: { type: String },
        year: { type: Number },
      },
    ],
    projects: [
      {
        title: { type: String },
        description: { type: String },
        projectLink: { type: String },
      },
    ],
  },
  dateCreated: { type: Date, default: Date.now },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
