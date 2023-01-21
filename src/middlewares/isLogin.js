const { validateToken } = require("../helpers/validateJwt");


const isLogin = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            
            return res.status(401).send({ message: "Por favor inicia sesion" });
        }
        const token = req.header("Authorization").split(" ")[1];
        const tokenData = await validateToken(token, res);
        if (!tokenData) {
            return res.status(401).send({ message: "Token invalido" });
        }
        req.user = tokenData;
        next();
    } catch (e) {
        return res.status(500).json(e)
    }
};

module.exports = { isLogin };
