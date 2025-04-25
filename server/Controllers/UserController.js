const Users = require("../Schemas/UserSchema")
const { v4: uuidv4 } = require("uuid");

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const createUser = async (req, res) => {

    try {
        const { name, picture, email } = req.body

        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        var [firstName, lastName] = name.split(' ')
        if (lastName == undefined) {
            lastName = ''
        }
        const userId = Math.floor(Math.random() * 10000) + 1

        const newUser = {
            name,
            FirstName: capitalize(firstName),
            LastName: capitalize(lastName),
            UserId: userId,
            picture,
            email,
            portfolios: [],
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
        }

        await Users.create(newUser)

        const userData = await Users.findOne({ email: email })

        if (userData) {
            res.status(201).json(userData)
        }

    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find()
        res.status(200).json(allUsers)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getUser = async (req, res) => {
    const userId = Number(req.params.id); // Convert to Number

    try {
        console.log('Finding user with ID:', userId);
        const data = await Users.findOne({ UserId: userId });
        console.log('User data found:', data);

        if (!data) {
            console.log('User not found for ID:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the profile data is properly structured
        if (!data.profile) {
            console.log('No profile data found for user:', userId);
            return res.status(404).json({ message: 'User profile not found' });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error('Error in getUser:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getUserByEmail = async (req, res) => {
    const userEmail = req.query.email
    const userData = await Users.findOne({ email: userEmail })
    if (userData) {
        res.status(200).json(userData)
    } else {
        res.status(404).json({ error: "User not found" })
    }
}
const updatePortfolios = async (req, res) => {
    try {
        const { email, portfolio } = req.body;

        if (!email || !portfolio) {
            return res.status(400).json({ error: 'Missing required fields: email or portfolio' });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check for duplicate portfolios (optional, based on your requirements)
        const isDuplicate = user.portfolios.some((p) => JSON.stringify(p) === JSON.stringify(portfolio));
        if (isDuplicate) {
            return res.status(400).json({ error: 'Duplicate portfolio' });
        }

        user.portfolios.push(portfolio);

        await user.save();

        res.status(200).json({ message: 'Portfolios updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const updateUserProfile = async (req, res) => {
    try {
        const { email, profile, name } = req.body;
        console.log('Received update request:', { email, name, profile });

        if (!email || !profile || !name) {
            console.log('Missing required fields:', { email, profile, name });
            return res.status(400).json({ error: 'Missing required fields: email, profile, or name' });
        }

        const existingUser = await Users.findOne({ email });
        console.log('Found existing user:', existingUser ? 'Yes' : 'No');

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        var [firstName, lastName] = name.split(' ');
        if (!firstName) {
            return res.status(400).json({ error: 'Invalid name format' });
        }
        if (!lastName) {
            lastName = '';
        }

        // Transform the profile data to match the expected structure
        const transformedProfile = {
            fullName: profile.fullName || name,
            phoneNumber: profile.phoneNumber || "",
            role: profile.role || "",
            emailAddress: profile.emailAddress || email,
            bio: profile.bio || "",
            resume: profile.resume || "",
            skills: profile.skills || [],
            socialLinks: {
                website: profile.socialLinks?.website || "",
                facebook: profile.socialLinks?.facebook || "",
                twitter: profile.socialLinks?.twitter || "",
                instagram: profile.socialLinks?.instagram || "",
                linkedin: profile.socialLinks?.linkedin || "",
                github: profile.socialLinks?.github || "",
                behance: profile.socialLinks?.behance || "",
                dribbble: profile.socialLinks?.dribbble || ""
            },
            education: {
                degree: profile.education?.degree || "",
                fieldOfStudy: profile.education?.fieldOfStudy || "",
                institution: profile.education?.institution || "",
                graduationYear: profile.education?.graduationYear || null
            },
            workExperience: profile.workExperience || [{
                jobTitle: "",
                organization: "",
                duration: "",
                description: ""
            }],
            achievements: profile.achievements || [{
                title: "",
                description: "",
                year: null
            }],
            projects: profile.projects || [{
                name: "",
                description: "",
                imgLink: "",
                stack: [],
                SourceCode: "",
                livePreview: ""
            }]
        };

        console.log('Updating user with transformed profile:', transformedProfile);

        // Update the user document
        const updatedUser = await Users.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    FirstName: capitalize(firstName),
                    LastName: capitalize(lastName),
                    name: name,
                    profile: transformedProfile
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('Failed to update user profile');
        }

        console.log('User profile updated successfully:', updatedUser);
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error in updateUserProfile:', err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


const addChat = async (req, res) => {
    try {
        const { userId, jobRole, jobDescription } = req.body;

        const user = await Users.findOne({ UserId: userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const newChat = {
            chatId: uuidv4(),
            jobRole,
            jobDescription,
            chat: []
        };

        user.chats.push(newChat);
        await user.save();

        res.status(201).json({ message: "Chat added successfully", chat: newChat });
    } catch (error) {
        res.status(500).json({ message: "Error adding chat", error: error.message });
    }
};


const getChats = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.findOne({ UserId: userId });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user.chats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chats", error: error.message });
    }
};

const getChatById = async (req, res) => {
    try {
        const { userId, chatId } = req.params;
        const user = await Users.findOne({ UserId: userId });

        if (!user) return res.status(404).json({ message: "User not found" });

        const chat = user.chats.find(c => c.chatId === chatId);

        if (!chat) return res.status(404).json({ message: "Chat not found" });

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chat", error: error.message });
    }
};

const updateChat = async (req, res) => {
    try {
        const { userId, chatId } = req.params;
        const { updatedChat } = req.body;

        const updatedUser = await Users.findOneAndUpdate(
            { UserId: userId, "chats.chatId": chatId },
            { $push: { "chats.$.chat": { $each: updatedChat.chat } } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User or Chat not found" });

        res.status(200).json({ message: "Chat updated successfully", chat: updatedUser.chats.find(c => c.chatId === chatId) });
    } catch (error) {
        res.status(500).json({ message: "Error updating chat", error: error.message });
    }
};


const deleteChat = async (req, res) => {
    try {
        const { userId, chatId } = req.params;
        const user = await Users.findOne({ UserId: userId });

        if (!user) return res.status(404).json({ message: "User not found" });

        user.chats = user.chats.filter(c => c.chatId !== chatId);
        await user.save();

        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting chat", error: error.message });
    }
};


module.exports = { createUser, getAllUsers, getUser, getUserByEmail, updatePortfolios, updateUserProfile, addChat, getChats, getChatById, updateChat, deleteChat }