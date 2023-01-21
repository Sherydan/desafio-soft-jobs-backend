const { registerUser, getUser } = require("../models/usersModel");
const { checkUserFields } = require("../helpers/validateNewUser");
const jwt = require("jsonwebtoken");

const insertUser = async (req, res) => {
    try {
        const payload = req.body;
        if (checkUserFields(payload)) {
            res.status(404).send("All fields are required");
        } else {
            const newUser = await registerUser(payload);
            res.status(201).json(newUser);
        }
    } catch (error) {
        res.send(error);
    }
};


const userData = async (req, res) => {
    try {
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        const {email} = jwt.decode(token)
        const user = await getUser(email)
        console.log(user);
        res.status(200).send(user[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = { insertUser, userData };
