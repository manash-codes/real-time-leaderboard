const UserModel = require('../models/User.model');

const getUser = (req, res) => {
    try {
        const { password: _pw, ...safeUser } = req.user.toObject();
        // console.log('user', safeUser)
        res.json({ success: true, message: "User found successfully", user: safeUser })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateUser = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            return res.status(400).json({ success: false, message: "Name must be at least 2 characters" });
        }

        const updated = await UserModel.findByIdAndUpdate(
            req.user._id,
            { name: name.trim() },
            { new: true, select: '-password' }
        );

        res.json({ success: true, message: "User updated successfully", user: updated })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteUser = async (req, res) => {
    try {
        await UserModel.deleteOne({ _id: req.user._id });
        res.clearCookie('token');
        res.json({ success: true, message: "User deleted successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser
}
