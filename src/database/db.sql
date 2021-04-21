CREATE TABLE Users (
    user_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nickname varchar(50) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    email varchar(50) UNIQUE,
    name varchar(50)
);

CREATE TABLE Permission(
    list_id_perm int NOT NULL,
    user_id_perm int NOT NULL,
    user_granted_perm int,
    PRIMARY KEY(user_id_perm, list_id_perm),
    CONSTRAINT fk_userid_perm
        FOREIGN KEY (user_id_perm) REFERENCES Users(user_id),
    CONSTRAINT fk_list_id_perm
         FOREIGN KEY (list_id_perm) REFERENCES ListProducts(list_id)
);

CREATE TABLE ListProducts(
    list_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    list_name varchar(50) NOT NULL,
    user_id_li int NOT NULL,
    CONSTRAINT fk_user_id_li
        FOREIGN KEY (user_id_li) REFERENCES Users(user_id)
);

INSERT INTO ListProducts (list_name, user_id_li) VALUES ("Prueba", 1);
INSERT INTO ListProducts (list_name, user_id_li) VALUES ("Otra lista", 21);


CREATE TABLE Products (
    product_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_name varchar(50) NOT NULL,
    product_price float,
    quantity int,
    list_id_prod int NOT NULL,
    CONSTRAINT fk_list_id_prod
        FOREIGN KEY (list_id_prod) REFERENCES ListProducts(list_id)
);

UPDATE Products
SET product_name = "Hola" 
WHERE list_id_prod = 3 AND product_id = 16;

CREATE TABLE Saved_Products(
    product_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_name varchar(50) NOT NULL,
    product_price float,
    quantity int, 
    date varchar(30),
    user_id_sav int NOT NULL,
    CONSTRAINT fk_user_id_sav
        FOREIGN KEY (user_id_sav) REFERENCES Users(user_id)
);

INSERT INTO `Users` (`user_id`, `nickname`, `password`, `email`, `name`) VALUES (1, 'eaque', '3b53aba20dad865dcc2616b3d20b30b94107c03a', 'salma23@example.com', 'vero');
INSERT INTO `Users` (`user_id`, `nickname`, `password`, `email`, `name`) VALUES (2, 'tenetur', '4480b2adc727d776a8de5fe2a035725aae3353a1', 'savion77@example.net', 'est');
INSERT INTO `Users` (`user_id`, `nickname`, `password`, `email`, `name`) VALUES (3, 'ut', '7f957266a37e60f100271852511259f1c4ad0e6a', 'jovan.hyatt@example.org', 'consequatur');
