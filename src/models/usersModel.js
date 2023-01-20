const {pool} = require("../helpers/connectionDB")
const bcrypt = require('bcryptjs')

const registerUser = async (user) => {
    try {
        let { email, password, rol, lenguage } = user;
        const encriptedPassword = bcrypt.hashSync(password);
        password = encriptedPassword;
        const values = [email, encriptedPassword, rol, lenguage];
        const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
        const result = await pool.query(consulta, values);
        const rowCount = result.rowCount

        if (!rowCount) {
            throw {
                code: 404,
                message: "Cant create user"
            }
        }

        return result.rows
    } catch (error) {
        console.log(error)
    }
};

module.exports = {registerUser}