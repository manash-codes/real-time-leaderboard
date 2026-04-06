const UserModel = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const SECRET = process.env.JWT_SECRET

const register = async (req, res) => {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ name, email, username, password: hashPassword });
    await user.save();

    res.json({ success: true, message: "User added successfully", user })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });

    res.cookie('token', token, { httpOnly: true });
    res.json({ success: true, message: "User logged in successfully" })
}

module.exports = {
    register,
    login
}
