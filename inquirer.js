
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost", 
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.query("SELECT * FROM products", function(err, results) {
    if (err) {
        console.log("Error connecting before inquirer");
    };

    inquirer
    .prompt([
      {
        name: "product_buying",
        type: "rawlist",
        choices: function() {
            var choiceArray = [];
            for (var i=0; i< results.length; i++) {
                choiceArray.push(results[i].product_name);
            }
            return choiceArray;
            },
        message: "What would you like to buy?"    

      },
      {
        name: "quantity_desired",
        type: "input",
        message: "How many units of products would you like?"
      },
      
    ]).then(function(answer){
        var chosenItem;
        for (var i=0; i < answer.length; i++) {
          if (results[i].item_id === answer.product_buying){
            chosenItem = results[i];
          }
        }
        if (answer.quantity_desired > parseInt(results.stock_quantity)) {
          console.log( "This item is low in stock.")
        
        }
        

    })

})

