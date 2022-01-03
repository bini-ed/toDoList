# toDoList
A to-do list app written by react, node JS and MySQL.<br><br>

!!You need to run wamp/xamp before setting up the database!!.<br>

Open the toDoList folder using cmd.<br>
Then go to server folder.<br>

Server Installation<br>
1.First you need install the required packages in the server folder.You can do this by running "npm install" inside the folder "server"<br>
2.Then you need to run "npm run dev" inside server folder,this will create the database (MySQL) based on information in config.json and migrate model to MySQL db table from migration folder.(Migration file is already created, no need to create new one)<br>
3.Start the server by "npm start" this wil run nodemon index.js command under the hood.<br>
The server should be up and running correctly by now.<br>

Client folder installation<br>
1.Go back to toDoList folder and then go to client folder,then run npm install.This will install all the required packages.<br>
2.Run npm start,the react app will start.<br>

