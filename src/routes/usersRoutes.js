const express = require("express");
const router = express.Router()
const {reportRequest} = require("../middlewares/logger")

const {insertUser, userData} = require("../controllers/usersController");
const { isLogin } = require("../middlewares/isLogin");

router.post("/usuarios",reportRequest, insertUser)
router.get("/usuarios", reportRequest,isLogin, userData)

module.exports = router
