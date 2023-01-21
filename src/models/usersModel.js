const {pool} = require("../helpers/connectionDB")
const bcrypt = require('bcryptjs');
const e = require("express");

const registerUser = async (user) => {
    if ( await checkIfUserAlreadyExists(user)) {
        throw {
            code: 404,
            message: "User already exists"
        }
    }
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
// check if user already exists, returns true if exists, false if not
const checkIfUserAlreadyExists = async ({email}) => {
    try {
        const consulta = "SELECT * FROM usuarios WHERE email = $1"
        const values = [email]
        const result = await pool.query(consulta,values)
        
        if (result.rowCount >= 1) {
            return true
        } else{
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

const getUser = async (email) => {
    try {
        values = [email];
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        const result = await pool.query(consulta, values);
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {registerUser, getUser}