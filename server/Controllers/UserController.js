const Users = require("../Models/UserModel");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({ UserId: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, picture, email } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    var [firstName, lastName] = name.split(" ");
    if (lastName == undefined) {
      lastName = "";
    }
    const userId = Math.floor(Math.random() * 10000) + 1;

    const newUser = {
      name,
      FirstName: capitalize(firstName),
      LastName: capitalize(lastName),
      UserId: userId,
      picture,
      email,
      profile: {
        fullName: "",
        phoneNumber: "",
        role: "",
        emailAddress: "",
        bio: "",
        resume: "",
        skills: [],
        socialLinks: {
          website: "",
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
          github: "",
          behance: "",
          dribbble: "",
        },
        education: {
          degree: "",
          fieldOfStudy: "",
          institution: "",
          graduationYear: null,
        },
        workExperience: [
          {
            jobTitle: "",
            organization: "",
            duration: "",
            description: "",
          },
        ],
        achievements: [
          {
            title: "",
            description: "",
            year: null,
          },
        ],
        projects: [
          {
            name: "",
            description: "",
            imgLink: "",
            stack: [],
            SourceCode: "",
            livePreview: "",
          },
          {
            name: "",
            description: "",
            imgLink: "",
            stack: [],
            SourceCode: "",
            livePreview: "",
          },
          {
            name: "",
            description: "",
            imgLink: "",
            stack: [],
            SourceCode: "",
            livePreview: "",
          },
        ],
      },
    };

    await Users.create(newUser);

    const userData = await Users.findOne({ email: email });

    if (userData) {
      res.status(201).json(userData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { UserId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Users.findOneAndDelete({ UserId: req.params.id });
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
