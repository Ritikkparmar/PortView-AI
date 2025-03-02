const express = require("express")
const router = express.Router()

const {createUser, getAllUsers, getUser, getUserByEmail, updatePortfolios, updateUserProfile, addChat, getChats, getChatById, updateChat, deleteChat} = require("../controllers/userController")
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/find/:id', getUser);
router.get('/verify/', getUserByEmail);
router.put('/update/', updatePortfolios);
router.put('/updateprofile', updateUserProfile);

router.post('/chat', addChat);
router.get('/chat/:userId', getChats);
router.get('/chat/:userId/:chatId', getChatById);
router.put('/chat/:userId/:chatId', updateChat);
router.delete('/chat/:userId/:chatId', deleteChat);

module.exports = router;