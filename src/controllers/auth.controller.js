const UserModel = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const SECRET = process.env.JWT_SECRET

const register = async (req, res) => {
    const { name, email, username, password } = req.body;

    try {
        if (!name || !email || !username || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const userExists = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            const field = userExists.email === email ? 'email' : 'username';
            return res.status(400).json({ success: false, message: `This ${field} is already taken` });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, email, username, password: hashPassword });

        const { password: _pw, ...safeUser } = user.toObject();

        res.json({ success: true, message: "User added successfully", user: safeUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ success: true, message: "User logged in successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
    return res.status(500).json({ success: true, message: 'Logged out successfully' })
}

module.exports = {
    register,
    login,
    logout
}

