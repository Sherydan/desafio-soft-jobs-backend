const { validateToken } = require("../helpers/validateJwt");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const isLogin = async (req, res, next) => {
    //create login middleware
    const Authorization = req.header("Authorization");
    let token = Authorization.split("Bearer ")[1];
    console.log(token);

    // chek if token exists
    if (token === "null" || token === "undefined" || token === null) {
        res.status(401).send("You must be logged in");
        
    } else {
        try {
            //console.log(token);
            const { email } = await validateToken(token, res);
            req.email = email;
            next();
        } catch (error) {
            res.status(500).send("Invalid token");
        }
    }
};

module.exports = { isLogin };
