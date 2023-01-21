const { registerUser } = require("../models/usersModel");
const { checkUserFields } = require("../helpers/validateNewUser");

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

module.exports = { insertUser };
