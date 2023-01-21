const pool = require("../db/connectionDb").pool;
const bcrypt = require("bcryptjs");

const getUser = async (email) => {
    try {
        values = [email];
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        const result = await pool.query(consulta, values);
        if(!rowCount) {
            throw {code: 404, message: "User not found"}
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getUser };
