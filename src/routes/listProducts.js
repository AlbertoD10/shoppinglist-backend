const express = require("express");
const api = express.Router();
const ListProductsController = require("../controllers/listProducts");

api.post("/create-list", ListProductsController.createList);

module.exports = api;
