CREATE TABLE category(
	id uuid PRIMARY KEY,
	categoryName VARCHAR (50) UNIQUE NOT NULL
);
CREATE TABLE product(
	id uuid PRIMARY KEY,
	productName VARCHAR(50) UNIQUE NOT NULL,
	price FLOAT not null,
	categoryId uuid not null,
	foreign key(categoryId) references category(id) ON DELETE SET NULL (categoryId),
	createdOn TIMESTAMP NOT NULL
);
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
