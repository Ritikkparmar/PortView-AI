const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    UserId: Number,
    name: { type: String, required: true },
    picture: String,
    email: { type: String, required: true, unique: true, trim: true },
    profile: {
        fullName: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true },
        role: { type: String, trim: true },
        emailAddress: { type: String, required: true, trim: true },
        bio: { type: String, default: "", trim: true },
        resume: { type: String, trim: true },
        skills: { type: [String], default: [] },
        socialLinks: {
          website: { type: String, default: "", trim: true },
          facebook: { type: String, default: "", trim: true },
          twitter: { type: String, default: "", trim: true },
          instagram: { type: String, default: "", trim: true },
          linkedin: { type: String, default: "", trim: true },
          github: { type: String, default: "", trim: true },
          behance: { type: String, default: "", trim: true },
          dribbble: { type: String, default: "", trim: true },
        },
        education: {
          degree: { type: String, trim: true },
          fieldOfStudy: { type: String, trim: true },
          institution: { type: String, trim: true },
          graduationYear: { type: Number },
        },
        workExperience: [
          {
            jobTitle: { type: String, trim: true },
            organization: { type: String, trim: true },
            duration: { type: String, trim: true },
            description: { type: String, trim: true },
          },
        ],
        achievements: [
          {
            title: { type: String, trim: true },
            description: { type: String, trim: true },
            year: { type: Number },
          },
        ],
        projects: [
          {
            name: { type: String, trim: true },
            description: { type: String, trim: true },
            imgLink: { type: String, trim: true },
            stack: { type: [String], default: [] },
            SourceCode: { type: String, trim: true },
            livePreview: { type: String, trim: true },
          },
        ],
      },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
