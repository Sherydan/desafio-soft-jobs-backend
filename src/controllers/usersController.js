const {
    registerUser,
    getUser,
    checkIfUserAlreadyExists,
} = require("../models/usersModel");
const { checkUserFields } = require("../helpers/validateNewUser");
const jwt = require("jsonwebtoken");

const insertUser = async (req, res) => {
    
    // add a new user to the database
    // check if all fields are filled
    // check if user already exists
    // if not, create a new user
    // return a response
    try {
        const { email, password, rol, lenguage } = req.body;
        const user = { email, password, rol, lenguage };
        const userExists = await checkIfUserAlreadyExists(user);
        if (userExists) {
            res.status(500).send("User already exists");
        } else {
            if (checkUserFields(user)) {
                res.status(500).send("Please fill all fields");
            } else {
                const result = await registerUser(user);
                res.status(200).send(result);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

    // try {
    //     const payload = req.body;
    //     if (checkUserFields(payload)) {
    //         res.status(404).send("All fields are required");
    //     } else {
    //         if (await checkIfUserAlreadyExists(payload)) {
    //             res.status(404).send("User already exists");
    //         }
    //     }
    //     const newUser = await registerUser(payload);
    //     res.status(201).json(newUser);
    // } catch (error) {
    //     res.send(error);
    // }

};

const userData = async (req, res) => {
    try {
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        const { email } = jwt.decode(token);
        const user = await getUser(email);
        console.log(user);
        res.status(200).send(user[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = { insertUser, userData };
