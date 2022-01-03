const jwt = require("jsonwebtoken");
const secretKey = "toDoList"; //secretKey used to generate the jwt token.Secret keys should not be stored as plain text in code rather should be stored in enviroment variable but as this is a demo i stored it in the code

const generateToken = async (user_id, firstName, lastName, userName) => {
  //a function used to generate jwt token using the above paramteres given to the function and return it.

  const token = jwt.sign({ user_id, firstName, lastName, userName }, secretKey);
  return token;
};

module.exports = generateToken;
