var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table")

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
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "\nWhat action would you like to take?",
        choices: ["View Product Sales by Department", "Create New Department", "Exit"]
      })
      .then(function(answer) {
        if (answer.options === "View Product Sales by Department") {
          productSales()
        } else if(answer.options === "Create New Department") {
          newDepartment()
        } else if(answer.options === "Exit") {
          connection.end();
        }
      });
  }

  function productSales() {
      connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(IFNULL(products.product_sales, 0)) as product_sales, SUM(IFNULL(products.product_sales, 0)) - departments.over_head_costs as total_profit FROM products RIGHT JOIN departments ON products.department_name = departments.department_name GROUP BY departments.department_id, departments.department_name, departments.over_head_costs", function(err, res){
          if (err) throw err;
          console.table(res)
          start();
      })
  }

  function newDepartment() {
  inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "What is the name of the department you'd like to add?",
    },
    {
        name: "costs",
        type: "input",
        message: "What are the overhead costs for this department",
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
    "INSERT INTO departments SET ?",
    {
      department_name: answer.name,
      over_head_costs: answer.costs,
    },
    function(err, res) {
      if (err) throw err;
      console.log(`\n\n${answer.name} department added! Press up arrow to return to menu.\n`);
    }
  )
  start();
  })
}