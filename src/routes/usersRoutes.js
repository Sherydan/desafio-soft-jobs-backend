const express = require("express");
const router = express.Router()
const {reportRequest} = require("../middlewares/logger")

const {insertUser} = require("../controllers/usersController")

router.post("/usuarios",reportRequest, insertUser)

module.exports = router
