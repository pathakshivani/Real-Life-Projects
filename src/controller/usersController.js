const usersModel = require("../model/usersModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const otpGenerator = require("otp-generator");
//const nodemailer = require("nodemailer");

const SECRET_KEY = process.env.SECRET_KEY;

const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersModel.getUserById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role_id } = req.body;
        console.log(`Received request to create user with name: ${name}, email: ${email}, role_id: ${role_id}`);
        if (!name || !email || !password || !role_id) {
            console.log("Missing required fields for user creation.");
            return res.status(400).json({ error: "All fields are required." });
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(200).json(err);
            } else {
                console.log(`Hashed password: ${hash}`);
                const user = await usersModel.createUser(name, email, hash, role_id);
                console.log(`User created successfully: ${user}`);
                return res.status(200).json({ msg: 'The user has been registered', user });
            }
        });
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, password, role_id } = req.body;
        const user = await usersModel.updateUser(req.params.id, name, email, password, role_id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await usersModel.deleteUser(req.params.id);
        if (!result) return res.status(404).json({ message: "User not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await usersModel.loginUser(email, password);

        //Generate JWT Token
        const token = jwt.sign(
            { userId: user.id, role: user.role_id },
            SECRET_KEY
            // { expiresIn: "24h" } // Token expires in 1 hour
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id,
                role_name:user.role_name,
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const otpStore = {};

// Request OTP for Password Reset
const requestOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await usersModel.getUserByEmail(email);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Generate OTP
        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        otpStore[email] = otp; // Store OTP temporarily

        // Send OTP via email (using Nodemailer)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: "your-email@gmail.com", pass: "your-email-password" }
        });

        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP is: ${otp}`
        });

        res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP" });
    }
};

//  Verify OTP and Reset Password
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (otpStore[email] !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 5);
        await usersModel.updatePassword(email, hashedPassword);

        delete otpStore[email]; // Remove OTP after successful reset
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ error: "Password reset failed" });
    }
};


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, login};