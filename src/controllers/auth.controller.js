const register = (req, res) => {
    res.json({ title: "called" })
}

const login = (req, res) => {
    res.json({ title: "called login" })
}

module.exports = {
    register,
    login
}