const { Users, validateUser } = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const createUser = async (req, res) => {
  const { firstName, lastName, userName, password } = req.body; //receive firstName, lastName, userName and password from user
  const { error } = validateUser(req.body); //validate the received user information using validate function which i define in user model
  if (error) return res.status(400).send(error.message); //if error occure eg. if the user doesn't enter a user name it'll show error message

  const checkUserIfExist = await Users.findAll({ where: { userName } }); //check if the user is already registered
  if (checkUserIfExist[0]) {
    return res.status(404).send("User is already registered"); //if so show error message
  } else {
    const hashed = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, hashed); //as your requirement hashing the password before saving into db

    const savedUser = {
      firstName,
      lastName,
      userName,
      password: hashedPassword,
    };

    const user = await Users.create(savedUser); //saving the user with hashed password
    if (!user) return res.status(400).send("User registration failed");
    //show error message if registration fails
    else {
      const token = await generateToken(
        user.dataValues.user_id, //since user_id is primary key and auto increement is enabled we can't receive its value from user rather we get its value after a user is registered from MYSQL response
        firstName,
        lastName,
        userName
      ); //generate jwt token using the user_id,firstName, lastName, and userName
      if (!token) return res.status(400).send("Failed");

      res
        .header("user-auth-token", token)
        .header("access-control-expose-headers", "user-auth-token")
        .send("User registred successfully"); // sending the generated token as header response with success message so that front end dev can use this token.
    }
  }
};
const getUser = async (req, res) => {
  const getUser = await Users.findAll(); //get all user
  if (!getUser[0]) {
    return res.status(400).send("No user is registered");
  } else {
    res.send(getUser);
  }
};

const userAuthenticate = async (req, res) => {
  const { userName, password } = req.body; //receive userName and password from user

  const findUser = await Users.findOne({ where: { userName } }); //check if the user exist

  if (!findUser) return res.status(400).send("Sorry,User does not exist");
  //if the user is not already registered show the above error message
  else {
    const checkPassword = await bcrypt.compare(password, findUser.password); //if the user is registered, hash the received password and compare with the saved user password in db
    if (checkPassword) {
      //if password matchs
      const { user_id, firstName, lastName, userName } = findUser;
      const token = await generateToken(user_id, firstName, lastName, userName); //generating jwt token using the users user_id, firstName, lastName, and userName
      if (token) res.send(token);
      // sending the generated token as response thus the token can used in front end (saved to local storage of browser to keep the user logged in)
      else return res.status(404).send("No token found");
    } else {
      return res.status(404).send("Incorrect password or username "); //if the recieved password don't match with pass in db show error message
    }
  }
};

module.exports = { createUser, getUser, userAuthenticate };
