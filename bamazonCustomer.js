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
        console.log("------------------------------------------------------------------------");
        
        askWhatProduct(res);

      });
}


//-------------------------------------------------------------

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

      var newStockNum = availItemNum - userQuanDesired;


      connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity : newStockNum
            },
            {
              item_id : id
            }
          ],
          
      )
    console.log( "Your cost is $" + results[0].price * quantity)

      shopMore()

    }else
    {
      console.log("Sorry, low inventory. Cannot process your order.")
    }

})

}

//---------------------------------------------------------------

function shopMore(){

inquirer.prompt([
  {
    type: 'confirm',
    name: 'confirmPromp',
    message: 'Would you like to buy more?'

}
]).then(function(answer){
var confirmP = answer.confirmPromp;
if(confirmP){

  showAllProducts()

}else{
  console.log("Thank you for shopping with us!")
  connection.end();
}
})
}

