const pool = require("../database");

//When POST a new user
function SignUpModel(newUser, callback) {
  /*This is a shortcut for the pool.getConnection() -> connection.query() -> connection.release()
    code flow. Using pool.getConnection() is useful to share connection state for subsequent queries.
    This is because two calls to pool.query() may use two different connections and run in parallel.*/
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected

    //Verify if the user exists in the DB
    connection.query(
      "SELECT nickname, email from Users WHERE nickname = ? OR email = ? ",
      [newUser.nickname, newUser.email],
      (err, results) => {
        if (err) {
          console.log(err);
          callback({ message: "Ha ocurrido un error.", status: 500 });
        }

        if (results.length > 0) {
          let message = {};
          results.forEach((item) => {
            if (item.nickname === newUser.nickname) {
              message = {
                ...message,
                nickname: "Este nombre de usuario ya existe.",
              };
            }
            if (item.email === newUser.email) {
              message = {
                ...message,
                email: "Este email ya está registrado.",
              };
            }
          });

          return callback({ message, status: 422 });
        } else {
          //Save the user in the DB
          connection.query(
            "INSERT INTO Users (nickname, password, email) VALUES (?, ?, ?)",
            [newUser.nickname, newUser.password, newUser.email],
            (err, results) => {
              console.log(err);
              if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                  callback({ message: "Este usuario ya existe.", status: 500 });
                } else {
                  callback({
                    message: "Ha ocurrido un error, vuelva a intentar",
                    status: 500,
                  });
                }
              } else {
                callback({ message: "Usuario creado.", status: 200 });
              }
            }
          );
          // When done with the connection, release it.
          connection.release();
        }
      }
    );
  });
}

function LoginModel(user, callback) {
  pool.query(
    "SELECT password, user_id, nickname from Users WHERE nickname = ? OR email = ? ",
    [user.nickname, user.email],
    (err, result) => {
      if (err) {
        callback({ message: "Ha ocurrido un error.", status: 500 });
      } else {
        if (result.length > 0) {
          callback(result[0]);
        } else {
          callback({ message: "Usuario no encontrado" });
        }
      }
    }
  );
}

module.exports = {
  SignUpModel,
  LoginModel,
};
