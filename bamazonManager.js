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

function view() {
        connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(`\n----------------------------------------`)
        console.log("BAMAZON PRODUCTS:");
        console.log(`----------------------------------------`)
        for (var i=0; i<res.length; i++) {
            console.log(`\nProduct ID: ${res[i].item_id}`);
            console.log(`Product Name: ${res[i].product_name}`);
            console.log(`Price: ${res[i].price}`);
            console.log(`Product Sales: ${res[i].product_sales}`)
            console.log(`Stock Quantity: ${res[i].stock_quantity}\n`);
            console.log(`----------------------------------------`)
        } console.log("Press up arrow to return to menu.")
}) 
start();
}

function lowInventory() {
        connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(`\n----------------------------------------`)
        console.log("LOW INVENTORY:");
        console.log(`----------------------------------------`)
        for (var i=0; i<res.length; i++) {
            if (res[i].stock_quantity < 5) {
            console.log(`\nProduct Name: ${res[i].product_name}\n`);
            console.log(`----------------------------------------`)
            }
        } console.log("Press up arrow to return to menu.")
})
start();
}

function addToInventory() {
    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "What is the ID of the product for which you'd like to add more inventory?",
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
            message: "How many units of this product would you like to add to inventory?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              console.log("\nPlease enter a whole number.")
              return false;
            }
        }
    ]).then(function(answer) {

      connection.query('SELECT * FROM products WHERE item_id = ?', [answer.choice], function(err,res){
        if(err){console.log(err)};
        var stock 
        var name
        for (var i=0; i<res.length; i++) {
          stock = res[i].stock_quantity
          name = res[i].product_name
        }
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: (stock + parseInt(answer.quantity))
          },
          {
            item_id: parseInt(answer.choice)
          }
        ],
        function(err, res) {
            if (err) throw err
            console.log(`\n\n${name} inventory updated! Press up arrow to return to menu.\n`);
        }
      )
      })
      start();
})
}

function addProduct() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the product you'd like to add?",
        },
        {
            name: "department",
            type: "input",
            message: "What is the name of the department the product falls under?",
        },
        {
            name: "price",
            type: "input",
            message: "What is the price of the product?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                console.log("\nPlease enter a whole number.")
                return false;
              }
        },
        {
            name: "stock",
            type: "input",
            message: "How many units of this product are in stock?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                console.log("\nPlease enter a whole number.")
                return false;
              }
        }
    ]).then(function(answer) {
    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answer.name,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.stock
      },
      function(err, res) {
        if (err) throw err;
        console.log(`\n\n${answer.name} added! Press up arrow to return to menu.\n`);
      }
    )
    start();
    })
}

   function start() {
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "\nWhat action would you like to take?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
      })
      .then(function(answer) {
        if (answer.options === "View Products for Sale") {
          view()
        } else if(answer.options=== "View Low Inventory") {
          lowInventory()
        } else if(answer.options=== "Add to Inventory") {
          addToInventory()
        } else if(answer.options=== "Add New Product") {
          addProduct()
        } else {
          connection.end();
        }
      });
  }

   

