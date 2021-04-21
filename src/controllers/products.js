const Products = require("../models/products");

function AddProducts(req, res) {
  const newProduct = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    quantity: req.body.quantity,
    list_id: req.body.list_id,
  };

  Products.AddProductsModel(newProduct, (result) => {
    res.status(result.status).send(result);
  });
}

function UpdateProduct(req, res) {
  const product = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    quantity: req.body.quantity,
    product_id: req.body.product_id,
    list_id_prod: req.body.list_id_prod,
  };

  Products.UpdateProductsModel(product, (result) => {
    res.status(result.status).send(result);
  });
}

function GetProducts(req, res) {
  const product = req.body.list_id_prod;
  Products.GetProducts(product, (result) => {
    res.status(result.status).send(result);
  });
}

function DeleteProduct(req, res) {
  const product = req.params.id_product;

  Products.DeleteProduct(product, (result) => {
    res.status(result.status).send(result);
  });
}
module.exports = {
  AddProducts,
  UpdateProduct,
  GetProducts,
  DeleteProduct,
};
