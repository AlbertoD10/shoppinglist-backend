const pool = require("../database");

//When a post a new product

function AddProductsModel(newProduct, callback) {
  pool.query(
    "INSERT INTO Products (product_name, product_price, quantity, list_id_prod) VALUES (?, ?, ?, ?)",
    [
      newProduct.product_name,
      newProduct.product_price,
      newProduct.quantity,
      newProduct.list_id,
    ],
    (err, results) => {
      if (err) {
        callback({
          message: "Ha ocurrido un error, vuelva a intentar",
          status: 500,
        });
      } else {
        callback;
        callback({ message: "Producto añadido.", status: 200 });
      }
    }
  );
}

function UpdateProductsModel(product, callback) {
  pool.query(
    "UPDATE Products SET ? WHERE list_id_prod = ? AND product_id = ?",
    [product, product.list_id_prod, product.product_id],
    (err, results) => {
      if (err) {
        console.log(err);
        if (err.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
          callback({
            message: "Revise bien los datos enviados",
            status: 500,
          });
        } else
          callback({
            message: "Ha ocurrido un error, vuelva a intentar",
            status: 500,
          });
      } else {
        callback({
          message: "Producto actualizado",
          status: 200,
        });
      }
    }
  );
}

function GetProducts(product, callback) {
  pool.query(
    "SELECT * FROM Products WHERE list_id_prod = ? ",
    [product],
    (err, results) => {
      if (err) {
        callback({ message: "Ha ocurrido un error", status: 500 });
      } else {
        console.log();
        if (results.length > 0) {
          callback({
            results,
            status: 200,
          });
        } else {
          callback({ message: "La lista está vacía", status: 200 });
        }
      }
    }
  );
}

function DeleteProduct(product, callback) {
  pool.query(
    "DELETE FROM Products WHERE product_id = ?",
    [product],
    (err, results) => {
      if (err) {
        callback({ message: "Ha ocurrido un error", status: 500 });
      } else {
        console.log(results);
        callback({ message: "Se ha eliminado el producto", status: 200 });
      }
    }
  );
}

module.exports = {
  AddProductsModel,
  UpdateProductsModel,
  GetProducts,
  DeleteProduct,
};
