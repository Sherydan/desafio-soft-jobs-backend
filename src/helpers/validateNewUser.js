
const checkUserFields = ({email, password, rol, lenguage}) => {
    if (!email || !password || !rol || !lenguage) {
        return true
    } else {
        return false
    }
}

module.exports = {checkUserFields}