const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/user-controller");
const cors = require("cors");
const validateToken = require("../middleware/validate-token-handler");

const router = express.Router();
const port = process.env.PORT || 3001;
router.use(
  cors({
    credentials: true,
    origin: port,
  })
);
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
