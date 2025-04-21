const express = require("express");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, login } = require("../controller/usersController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { access } = require("../middleware/accessMiddleware");
// const { access } = require("../middleware/accessMiddleware")

const usersRouter = express.Router();

usersRouter.get('/getUsers', getAllUsers); 
usersRouter.get('/users/:id', getUserById);
usersRouter.post('/users', authenticateUser, access(1),createUser);
usersRouter.put('/users/:id', authenticateUser, access(1), updateUser);
usersRouter.delete('/users/:id',authenticateUser, access(1), deleteUser);
usersRouter.post("/login", login);
usersRouter.get("/profile", authenticateUser, (req, res) => {
    res.json({ message: "Access Granted", user: req.user });
});
//router.post("/request-otp", requestOtp);
//router.post("/reset-password", resetPassword);

module.exports = usersRouter;