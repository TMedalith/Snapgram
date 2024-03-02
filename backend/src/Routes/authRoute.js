const { Register, Login } = require("../Controllers/authController");
const { userVerification } = require("../Middleswares/authMiddleware");
const router = require("express").Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/",userVerification); 


module.exports = router;