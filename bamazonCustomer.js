var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
  });

connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start() {
    console.log(`\n----------------------------------------`)
    console.log("BAMAZON PRODUCTS FOR SALE:");
    console.log(`----------------------------------------\n`)
        connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log(`Product ID: ${res[i].item_id}`);
            console.log(`Product Name: ${res[i].product_name}`);
            console.log(`Price: ${res[i].price}\n`);
            console.log(`----------------------------------------\n`)
        }
      inquirer
        .prompt([
            {
                name: "choice",
                type: "input",
                message: "What is the ID of the product you'd like to purchase?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  console.log("\nPlease enter a whole number.")
                  return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of this product would you like to buy?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  console.log("\nPlease enter a whole number.")
                  return false;
                }
            }
        ]).then(function(answer) {
            var chosenItem;
            var productSales
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === parseInt(answer.choice)) { 
                      chosenItem = res[i];
                      productSales = res[i].product_sales
                  } 
                } 
        
          if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: chosenItem.stock_quantity - parseInt(answer.quantity),
                  product_sales: productSales + (parseInt(answer.quantity) * chosenItem.price)
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function(err) {
                var totalCost = chosenItem.price * parseInt(answer.quantity)
                if (err) throw err;
                console.log(`\nYour purchase went through! The total cost was: ${totalCost}\n`);
                inquirer.prompt([
                    {
                        name: "again",
                        type: "list",
                        message: "Would you like to buy something else?",
                        choices: ["Yes", "No"]
                    },
                ]).then(function(answer) {
                    if (answer.again === "Yes") {
                        start();
                    } else {
                        connection.end();
                    } 
                }) 
              }
            );
          }
          else {
            console.log("\nYour order has been canceled due to insufficient quantity!\n");
            inquirer.prompt([
              {
                  name: "again",
                  type: "list",
                  message: "Would you like to buy something else?",
                  choices: ["Yes", "No"]
              },
          ]).then(function(answer) {
              if (answer.again === "Yes") {
                  start();
              } else {
                  connection.end();
              } 
          }) 
          }
        })
        })
    }
