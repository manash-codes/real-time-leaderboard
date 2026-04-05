const User = require('../models/User.model');

const register = async (req, res) => {
    const { name, email, username, password } = req.body;

    const user = new User({ name, email, username, password });
    await user.save();

    res.json({ success: true, message: "User added successfully", user })
}

const login = (req, res) => {
    res.json({ title: "called login" })
}

module.exports = {
    register,
    login
}
