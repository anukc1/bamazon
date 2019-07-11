DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INTEGER(10) auto_increment not null,
product_name varchar(40),
department_name varchar(40),
price DECIMAL not null,
stock_quantity INTEGER(11) not null,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("notebook", "Office Supplies", 2.25, 20 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pens", "Office Supplies", 1.25, 20 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("notebooks", "Office Supplies", 3.25, 10 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("i-phone", "Cell Phones", 700, 5 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scouts", "Books", 6.75, 2 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Clorox", "Cleaning Supplies", 2.25, 20 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Broom", "Cleaning Supplies", 4.25, 10 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper clips", "Office Supplies", 3.25, 05 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Play mat", "Babies", 25, 3 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Swing", "Babies", 125, 2 );

DELETE FROM products WHERE product_name= "notebooks";

