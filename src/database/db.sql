CREATE TABLE Users (
    user_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nickname varchar(50) NOT NULL UNIQUE,
    password varchar(50) NOT NULL,
    email varchar(50) UNIQUE,
    name varchar(50)
);

CREATE TABLE Permission(
    permission_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id_perm int NOT NULL,
    user_granted_perm int NOT NULL,
    CONSTRAINT fk_userid_perm
        FOREIGN KEY (user_id_perm) REFERENCES Users(user_id)

);

CREATE TABLE Products (
    product_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_name varchar(50) NOT NULL,
    product_price float,
    quantity int,
    user_id_prod int NOT NULL,
    user_granted_prod int NOT NULL,
    CONSTRAINT fk_user_id_prod
        FOREIGN KEY (user_id_prod) REFERENCES Users(user_id)
);

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
