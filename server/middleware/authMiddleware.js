const jwt = require("jsonwebtoken");
const secretKey = "toDoList";

const authUser = async (req, res, next) => {
  //authorization middleware used to protect route. If a user is not logged any route that uses this middleware doesn't work
  const token = req.header("user-auth-token"); //jwt token is received through header
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, secretKey); //validate if the token is correct using the secretKey. The secret key should be in stored in enviroment variable but for this demo we stored it here
    res.user = decoded; //set user property obtained from the decoded token to response object
    next(); //pass to the next middleware
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authUser;
