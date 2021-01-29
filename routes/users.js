const express = require("express");
const router = express.Router()
const  {formLogin, login ,formRegister, register} = require("../controllers/usersController")
const path = require("path");
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

router.get("/register", formRegister)
router.post("/register/new-user", upload.any(), register)

router.get("/login", formLogin)
router.post("/login/success", login)



module.exports = router