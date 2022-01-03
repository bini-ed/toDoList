const Joi = require("joi");
const Sequelize = require("sequelize");
const dbConfig = require("../config/dbConfig");

const List = dbConfig.define("lists", {
  //design the table which we will create in db. This model is used to create migration and later used in controllers for using SQL queries using Sequelize
  list_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  listName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      //create a one to many relation ship from user and to-do list table using foreign key "user_id" in lists table
      model: "users",
      key: "user_id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  createdAt: {
    type: Sequelize.DataTypes.DATE,
  },
  updatedAt: {
    type: Sequelize.DataTypes.DATE,
  },
});

const validateList = (List) => {
  //a validator function that accept a to-do list from user and validate it before the to-do list is created
  const validationSchema = Joi.object({
    listName: Joi.string().required().label("To Do List"),
    user_id: Joi.number().required().label("User Id"),
    isCompleted: Joi.boolean().required().label("Is Completed"),
  });
  return validationSchema.validate(List); // validate the received list using the above validator schema and shows error message if the criteria is not fullfilled
};

module.exports = { List, validateList };
