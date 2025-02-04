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
        const newUser = new Users(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
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
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users.findOneAndDelete({ UserId: req.params.id });
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
