const getUser = (req, res) => {
    const id = req.user._id
    if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });

    res.json({ success: true, message: "User found successfully", user: req.user })
}

const upatedUser = (req, res) => {
    res.json({ title: "called" })
}

const deleteUser = (req, res) => {
    res.json({ title: "called" })
}

module.exports = {
    getUser,
    upatedUser,
    deleteUser
}