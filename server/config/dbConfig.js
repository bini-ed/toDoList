const Sequelize = require("sequelize");
const db = new Sequelize("to_do_list", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
