const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
  logout,
  allUsers
} = require("../controllers/user-controller");
// const cors = require("cors");
const validateToken = require("../middleware/validate-token-handler");

const router = express.Router();
// const port = process.env.PORT || 3001;
// router.use(
//   cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL || 3000,
//   })
// );
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.get("/logout", logout);

router.get("/", validateToken, allUsers);

module.exports = router;
