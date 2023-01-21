const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {verifyCredentials} = require("../models/loginModel")

const JWT_SECRET = process.env.JWT_SECRET

const userLogin = async (req, res) => {
    const {email, password} = req.body
    email.toLowerCase()
    password.toLowerCase()
    try {
        const user = await verifyCredentials(email)

        //check if user is not a empty arra
        if (user[0]){
            const {password: encryptedPassword} = user[0]
            const isPasswordCorrect = bcrypt.compareSync(password, encryptedPassword)

            if (isPasswordCorrect) {
                const token = jwt.sign({email}, JWT_SECRET)
                res.status(200).send(token)
            } else {
                res.status(500).send("Invalid user or password")
            }
            
        } else {
            res.status(500).send("Invalid user or password")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

module.exports = {userLogin}