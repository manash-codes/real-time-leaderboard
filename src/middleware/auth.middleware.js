const UserModel = require("../models/User.model");
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ success: false, message: "Invalid token" });

        const user = await UserModel.findById(decoded.id);
        if (!user) return res.status(401).json({ success: false, message: "User not found" });
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }

        return res.status(401).json({ message: "Invalid token" });
    }
}
