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

// function loadProducts() {

// };

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(
      "Welcome to Jamazon. Check Out Our Products \n" +
        "-----------------------------------------------------"
    );
      console.table(res);
    // for (let i = 0; i < res.length; i++) {
    //   console.log(
    //     res[i].item_id + " | " + res[i].product_name + " | " + res[i].price
    //   );
    // }
    console.log("----------------------------------");
    // connection.end();

    welcome(res);
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

function productSearch(inventory) {
    inquirer.prompt({
        name: "product",
        type: "input",
        message: "Enter the item id of the product you want to buy. [Quit with Q]",
        validate: function (val) {
            return !isNaN(val) || val.toLowerCase() === "q"
        }
    }).then(function (val) {
        checkQuit(val.product);

        let productId = parseInt(val.product);
        let product = checkInventory(productId, inventory);

        if (product) {
            askQuantity(product);
        } else {
            console.log("\nIt looks like that is not in stock.");
            displayItems();
        }
      
      
    })
};

function askQuantity(product) {
    inquirer.prompt([{
        type: "input",
        name: "quantity",
        message: "How many would you want? [Quit with Q]",
        validate: function (val) {
            return !isNaN(val) || val.toLowerCase() === "q"
        }
    }]).then(function (val) { 
        checkQuit(val.quantity);
        let quantity = parseInt(val.quantity);

        if (quantity > product.stock_quantity) {
            console.log("\nIt's sold out!");
            displayItems();
        } else {

        }
     })
    
}



function checkQuit(choice) {
    if (choice.toLowerCase() ==="q") {
        console.log("Goodbye!");
        process.exit(0);
    }
};

function checkInventory(productId, inventory) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === productId) {
            return inventory[i];
        }
    }
    return null
};


// let query = "SELECT * FROM products WHERE ?";
// connection.query("SELECT * FROM products", function (err, res) {
//     if (err) throw err;

// })