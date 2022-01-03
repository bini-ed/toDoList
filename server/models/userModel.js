const Joi = require("joi");
const Sequelize = require("sequelize");
const dbConfig = require("../config/dbConfig");

const Users = dbConfig.define("users", {
  user_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  firstName: { type: Sequelize.DataTypes.STRING, allowNull: false },
  lastName: { type: Sequelize.DataTypes.STRING, allowNull: false },
  userName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  createdAt: {
    type: Sequelize.DataTypes.DATE,
  },
  updatedAt: {
    type: Sequelize.DataTypes.DATE,
  },
});

const validateUser = (User) => {
  //a validator function that accept a firstName,lastName,userName,and password from user and validate it before the user is registered
  const validationSchema = Joi.object({
    //you can setp different criterias for validation like required min value, max value
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    userName: Joi.string().required().label("User Name"),
    password: Joi.string().required().label("Password"),
  });
  return validationSchema.validate(User); // validate the received user information using the above validator schema and shows error message if the criteria is not fullfilled
};

module.exports = { Users, validateUser };
