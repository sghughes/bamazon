DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('water bottle', 'home', 15, 50), ('coffee mug', 'home', 10, 100), ('iphone charger', 'electronics', 10, 75), ('watering can', 'garden', 7, 25), ('orange juice', 'grocery', 5, 30), ('baseball glove', 'sports & outdoors', 35, 20), ('tent', 'sports & outdoors', 500, 35), ('laptop', 'electronics', 1000, 50), ('gardening gloves', 'garden', 15, 200), ('pasta', 'grocery', 3, 50);