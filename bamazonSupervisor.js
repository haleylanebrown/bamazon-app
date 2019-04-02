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
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "\nWhat action would you like to take?",
        choices: ["View Product Sales by Department", "Create New Department"]
      })
      .then(function(answer) {
        if (answer.options === "View Product Sales by Department") {
          productSales()
        } else if(answer.options === "Create New Department") {
          newDepartment()
        } else {
          connection.end();
        }
      });
  }
