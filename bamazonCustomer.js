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
    console.log("connected as id " + connection.threadId + "\n");
    showAllProducts()
    postAuction()
    connection.end()
      
  });


function showAllProducts() {
    
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) {
          console.log("Error here!")
        };
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].product_name +" | " + res[i].price);
        }
        console.log("-----------------------------------");
        

      });
}


//-------------------------------------------------------------
function postAuction() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "product_buying",
          type: "input",
          message: "What is the ID of the product you want to buy?"
        },
        {
          name: "quantity_desired",
          type: "input",
          message: "How many units of products would you like?"
        },
        
      ]).then(function(answer){
          var chosenItem;
          for (var i=0; i < SpeechRecognitionResultList.length; i++) {
            if (results[i].item_id === answer.product_buying){
              chosenItem = results[i];
            }
          }
          if (quantity_desired > parseInt(answer.stock_quantity)) {
            console.log( "This item is low in stock.")
          
          }

      })

      
    }