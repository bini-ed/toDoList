const express = require("express");
const cors = require("cors");

const dbConfig = require("./config/dbConfig");
const userRouter = require("./router/userRouter");
const listRouter = require("./router/listRouter");

const app = express();
app.use(express.json()); //enable to JSON formating. our server can accept JSON data sent from forms
app.use(
  //allows requested resource from any source
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

dbConfig
  .authenticate() //connecting to database. Credentials are found in dbConfig file
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/", userRouter); //use userRouter
app.use("/", listRouter); //use listRouter

app.listen(PORT, console.log(`Connected on port ${PORT}`)); //listen on the assigned port
