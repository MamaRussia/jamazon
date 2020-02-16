const mysql = require("mysql"), inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "locahost",
    port: 3306,
    user: "root",
    password: "password",
    database: "jamazon"
});

connection.connect(function (err) { 
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
 })