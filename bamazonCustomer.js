// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    user: 'root',
    //add password here
    password: '',
    database: 'bamazon'
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});
// Function to load the products table from the database and print results to the console
function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Draw the table in the terminal using the response
    console.table(res);
    // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
    promptCustomerForItem(res);
  });
};

function promptCustomerForItem () {
    inquirer.prompt([{
        name: "pickItem",
        type: "input",
        message: "What is the ID of the item you would like to purchase?"
        //add validation 
    },
    {
        name: "pickQuantity",
        type: "input",
        message: "What quantity would you like to order?"
    }
    ])
    .then(function(buyItem){
      var itemChoice = buyItem.pickItem;
      console.log(itemChoice);
      connection.query("SELECT * FROM products WHERE item_id =" + itemChoice, function(err, res) {
        if (err) throw err;
        //console.log(res[0].price);
        if (res[0].stock_quantity<buyItem.pickQuantity){
          console.log('Insufficient quantity!')
          keepShopping();
        }
        else {
          var totalCost = buyItem.pickQuantity * res[0].price;
          var newQuantity = parseInt(res[0].stock_quantity - buyItem.pickQuantity);
          //console.log(newQuantity);
          connection.query("UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newQuantity
            },
            {
              item_id: itemChoice
            }
          ],
        function(err, res){
            if (err) throw err;
            //console.log(res)
            console.log('Your transaction is complete! Your total cost was $' + totalCost);
            keepShopping();
          });
        }
      })
    }
)};

function keepShopping(){
  inquirer.prompt([{
    name: 'keepShopping',
    type: 'checkbox',
    message: 'Would you like to keep shopping?',
    choices: ['yes','no']
  }]).then(function(repeatCustomer){
    var shoppingChoice = repeatCustomer.keepShopping[0];

    if (shoppingChoice === 'yes') {
      loadProducts();
    }
    else {
      console.log('See you next time!')
    }
  })

};




