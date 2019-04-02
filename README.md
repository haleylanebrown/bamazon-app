# Bamazon
DU Full-Stack Web Development Bootcamp

## Overview

Bamazon is an Amazon-like storefront using MySQL and Node.js. The app takes in orders from customers and depletes stock from the store's inventory.  This application uses the MySQL and Inquirer npm packages.

## Instructions

### Customer View

1. From your Terminal, run the Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Including the product IDs, names, and prices.

2. The app prompts the users with two messages:

    * The first asks them the ID of the product they would like to buy.
    * The second message asks how many units of the product they would like to buy.
    * For both messages, if the user does not enter a number, the app prompts them to enter a whole number instead.

3. Once the customer has placed the order, the app checks if the store has enough of the product to meet the customer's request.

    * If not, the app cancels the order due to  `Insufficient quantity!`, and prevents the order from going through.

4. However, if the store _does_ have enough of the product, the app fulfills the customer's order.
    * It updates the SQL database to reflect the remaining quantity and adds to the product sales column in the database (adds the price of the product multiplied by the number of units purchased)
    * Once the update goes through, it shows the customer the information, including the total cost of their purchase.
    
5. Finally the app prompts the user again to see if they wish to continue shopping or if they are done.


#### Screenshots and Gifs

1. Here is what the working app looks like:

    ![Customer View Screen Shot](/images/screenshot1.png)
    
2. Here is a quick video of the working app:

    ![Customer View Video](/images/bamazonCustomer.gif)



### Manager View

1. From your Terminal, run the Node application called `bamazonManager.js`. Running this application will list a set of menu options:

* View Products for Sale

* View Low Inventory

* Add to Inventory

* Add New Product

* Exit

If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, product sales, and quantities.

![Manager View Products for Sale](/images/screenshot2.png)

If a manager selects `View Low Inventory`, then it lists all items with an inventory count lower than five.

![Manager View Low Inventory](/images/screenshot3.png)

If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store. If the user does not enter a number (for either the item ID or quantity added), the app prompts them to enter a whole number.

![Manager View Add Inventory](/images/screenshot4.png)

If a manager selects `Add New Product`, the app allows the manager to add a completely new product to the store. When asked for the new product's department, the manager is provided with a drop-down list that is populated from the "departments" table in Sequel Pro. This way, the manager cannot create departments that don't already exist (only the supervisor is allowed to do this).

![Manager View Add Product 1](/images/screenshot5.png)
![Manager View Add Product 2](/images/screenshot6.png)

If a manager selects `Exit`, the connection is ended.

#### Gif of Working App for Manager View

1. Here is a quick gif of the working app:

![Manager View Gif](/images/bamazonManager.gif)

### Supervisor View

1. From your Terminal, run the Node application called `bamazonSupervisor.js`. Running this application will list a set of menu options:

* View Product Sales by Department

* Create New Department

* Exit

If a manager selects `View Product Sales by Department`, the app lists details for each department: department_id, department_name, over_head_costs, product_sales, total_profit

If a manager selects `Create New Department`, the app allows the supervisor to add a new department to the store.

#### Screenshots and Gif of Working App for Supervisor View

1. Here is a screenshot of the working app:

![Supervisor View Product Sales by Department and Create New Department Screenshot](/images/screenshot7.png)

2. Here is a quick gif of the working app:

![Supervisor View Product Sales by Department and Create New Department Gif](/images/bamazonSupervisor.gif)

### Initial Database Creation

1. Here is a screenshot of MySQLWorkbench and the process for initially creating the database:

![MySQLWorkbench Screen Shot](/images/mysql.png)