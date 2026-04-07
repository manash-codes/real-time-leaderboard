const getUser = (req, res) => {
    try {
        res.json({ success: true, message: "User found successfully", user: req.user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateUser = async (req, res) => {
    try {
        const { name } = req.body;
        if (req.user.name !== name) return res.status(400).json({ success: false, message: "Invalid name" });
        await User.updateOne({ _id: req.user._id }, { name });
        res.json({ success: true, message: "User updated successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.user._id });
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
