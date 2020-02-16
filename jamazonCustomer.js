const mysql = require("mysql"),
  inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "jamazon"
});

connection.connect(function(err) {
  if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayItems()
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id + " | " + res[i].product_name + " | " + res[i].price
      );
    }
    console.log("----------------------------------");
    connection.end();
  });
}
