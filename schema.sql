DROP DATABASE IF EXISTS jamazon;
CREATE DATABASE jamazon;

USE jamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ShaqFu", "Video Games", 49.95, 150),
  ("Legend of Zelda", "Video Games", 59.99, 200),
  ("Man Crate", "Food and Drink", 24.50, 50),
  ("Aviator Shades", "Apparel", 75.00, 5),
  ("Blue Jeans", "Apparel", 54.25, 35),
  ("Survival Machete", "Necessities", 42.42, 42),
  ("Bill and Ted's Excellent Adventure", "Films", 15.00, 25),
  ("Mad Max: Fury Road", "Films", 25.50, 57),
  ("Monopoly", "Board Games", 30.50, 35),
  ("Yahtzee", "Board Games", 19.95, 23);