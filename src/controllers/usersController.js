const { registerUser } = require("../models/usersModel")

const insertUser = async (req, res) => {
    try {
        const newUser = await registerUser(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {insertUser}