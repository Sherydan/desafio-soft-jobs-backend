const app = require('./server')
app.use('/', require("./src/routes/usersRoutes"))
app.use("/", require("./src/routes/loginRoutes"))


module.exports = app