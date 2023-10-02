const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  // let token;
  // let authHeader = req.headers.Authorization || req.headers.authorization;
  // if (authHeader && authHeader.startsWith("Bearer")) {
  //   token = authHeader.split(" ")[1];
  console.log(req.cookies);
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, obj) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = obj.user;
      next();
    });
  }
    else{
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  // }
});

module.exports = validateToken;