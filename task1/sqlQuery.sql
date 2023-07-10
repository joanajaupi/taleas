CREATE TABLE category(
	id uuid PRIMARY KEY,
	categoryName VARCHAR (50) UNIQUE NOT NULL
);
CREATE TABLE product(
	id uuid PRIMARY KEY,
	productName VARCHAR(50) UNIQUE NOT NULL,
	price FLOAT not null,
	categoryId uuid,
	foreign key(categoryId) references category(id) ON DELETE SET NULL,
	createdOn TIMESTAMP NOT NULL
);
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
