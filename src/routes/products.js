const express = require("express");
const api = express.Router();
const ProductsController = require("../controllers/products");
const md_prod = require("../middlewares/validations");

api.post(
  "/add-product",
  [md_prod.ValidateProducts],
  ProductsController.AddProducts
);
api.put(
  "/update-product",
  [md_prod.ValidateProducts],
  ProductsController.UpdateProduct
);
api.get("/get-product", ProductsController.GetProducts);
api.delete("/delete-product/:id_product", ProductsController.DeleteProduct);

module.exports = api;
