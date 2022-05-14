var jwt = require("jsonwebtoken");
const JWT_SECRET = "harryisagoodboy";

const fetchuser = (req, res, next) => {
  //get user from jwt token and add id
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Not valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.send(401);
  }
};
module.exports = fetchuser;
