const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const secretKey = process.env.JWT_SECRET ?? 'mohit' ;
  return jwt.sign({ id }, secretKey, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
