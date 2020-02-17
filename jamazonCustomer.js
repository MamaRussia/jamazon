const mysql = require("mysql"),
  inquirer = require("inquirer"),
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "jamazon"
  });

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayItems();
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(
      "Welcome to Jamazon. Check Out Our Products \n" +
        "---------------------------------"
    );

    for (let i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id + " | " + res[i].product_name + " | " + res[i].price
      );
    }
    console.log("----------------------------------");
    // connection.end();

    welcome();
  });
}

function welcome() {
  inquirer
    .prompt({
      name: "firstName",
      type: "input",
      message: "What is your first name?",
      default: "Jamazon Guest"
    })
    .then(function(answer) {
        console.log("Hello " + answer.firstName);
        productSearch()
    });
}

function productSearch() {
    inquirer.prompt({
        name: "product",
        type: "input",
        message: "Enter the item id of the product you want to buy."
    }).then(function (answer) {
        let query = "SELECT item_id FROM products WHERE ?";
        connection.query(query, { product: answer.product }, function (err, res) {
            for (let i = 0; i < res.length; i++) {
                console.log("Item ID: " + res[i].item_id + " || Name: " + res[i].product_name);
                
                
            }
        })
    })
}