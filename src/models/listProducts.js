const pool = require("../database");

//When a post a new product

function CreateListModel(listName, user_id, callback) {
  pool.query(
    "INSERT INTO ListProducts (list_name, user_id_li) VALUES (?, ?)",
    [listName, user_id],
    (err, results) => {
      if (err) {
        callback({
          message: "Ha ocurrido un error, vuelva a intentar",
          status: 500,
        });
      } else {
        callback;
        callback({ message: "Lista creada.", status: 200 });
      }
    }
  );
}

function UpdateList(list_id, data, callback) {
  pool.query(
    "UPDATE ListProducts SET ? WHERE list_id = ?",
    [data, list_id],
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
          message: "Lista actualizada",
          status: 200,
        });
      }
    }
  );
}

function GetAll(user_id_li, callback) {
  pool.query(
    "SELECT * FROM ListProducts WHERE user_id_li = ? ",
    [user_id_li],
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
          callback({ message: "No se ha encontrado la lista", status: 200 });
        }
      }
    }
  );
}

function DeleteList(list_id, callback) {
  pool.query(
    "DELETE FROM ListProducts WHERE list_id = ?",
    [list_id],
    (err, results) => {
      if (err) {
        callback({ message: "Ha ocurrido un error", status: 500 });
      } else {
        console.log(results);
        callback({ message: "Se ha eliminado la lista", status: 200 });
      }
    }
  );
}

module.exports = {
  CreateListModel,
  DeleteList,
  UpdateList,
  GetAll,
};
