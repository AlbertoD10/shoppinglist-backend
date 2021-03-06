const express = require("express");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./config");

//Import the routes
const AuthController = require("./routes/auth");
const ProductsController = require("./routes/products");
const UserController = require("./routes/user");
const ListProductsController = require("./routes/listProducts");

const app = express();

//Middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Configure Headers

// Use all the routes defined in routes
app.use(`/api/${API_VERSION}`, AuthController);
app.use(`/api/${API_VERSION}`, ProductsController);
app.use(`/api/${API_VERSION}`, UserController);
app.use(`/api/${API_VERSION}`, ListProductsController);

module.exports = app;
