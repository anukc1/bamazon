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
    showAllProducts();
    
      
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
        
        askWhatProduct(res);

      });
}


//-------------------------------------------------------------
// function postAuction() {

//     connectiong.query( "SELECT * FROM products", function(err, results){

//       if (err) {console.log("error at INQUIRER")};
function askWhatProduct(results) {
  inquirer
  .prompt([
    {
      name: "productID",
      type: "rawlist",
      choices: function() {
          var choiceArray = [];
          for (var i=0; i< results.length; i++) {
              choiceArray.push(results[i].item_id);
          }
          return choiceArray;
          },
      message: "Pick the id of the product that you'd like to buy."    
  
    },
    {
      name: "quantity",
      type: "input",
      message: "How many units of products would you like?"
    }
  ]).then(function(answer){
    console.log(answer)
      
    checkStock(answer.productID, answer.quantity)
    // var chosenItem;
    //   for (var i=0; i < answer.length; i++) {
    //     if (results[i].item_id === answer.product_buying){
    //       chosenItem = results[i];
    //     }
    //   }
    //   if (answer.quantity_desired > parseInt(results.stock_quantity)) {
    //     console.log( "This item is low in stock.")
      
    //   }
      
  
  })
  

}


function checkStock(id, quantity){

  connection.query( "SELECT * FROM products WHERE item_id=?", [id], function(err, results){

    if (err) {console.log("error finding products")};

    // console.log(results)
    // console.log(results[0].stock_quantity)

    var availItemNum = results[0].stock_quantity;
    var userQuanDesired = quantity;

    

    if(availItemNum > quantity){

    console.log("We have enough products.")
    console.log( "Your cost is $" + results[0].price * quantity)
    }else
    {
      console.log("Sorry, low inventory. Cannot process your order.")
    }


})

}

