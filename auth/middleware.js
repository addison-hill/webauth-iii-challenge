const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    const secret = "my dirty little secret";

    jwt.verify(token, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again." });
  }
};
