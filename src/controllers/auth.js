const Auth = require("../models/auth");

function SignUp(req, res) {
  const newUser = {
    nickname: req.body.nickname,
    password: req.body.password,
    email: req.body.email,
  };

  //Send the data to the model and  get a callback with the response of the DB
  Auth.SignUpModel(newUser, (result) => {
    console.log(result);
    res.status(result.status).send(result);
  });

  // /* This is a shortcut for the pool.getConnection() -> connection.query() -> connection.release()
  //  code flow. Using pool.getConnection() is useful to share connection state for subsequent queries.
  //   This is because two calls to pool.query() may use two different connections and run in parallel.*/

  // pool.getConnection((err, connection) => {
  //   if (err) throw err; //not connected

  //   //Verify if the user exists in the DB
  //   connection.query(
  //     "SELECT nickname, email from Users WHERE nickname = ? OR email = ? ",
  //     [newUser.nickname, newUser.email],
  //     (err, results) => {
  //       if (err) {
  //         res
  //           .status(500)
  //           .send({ message: "Ha ocurrido un error.", status: 500 });
  //       }

  //       if (results.length > 0) {
  //         let message = {};
  //         results.forEach((item) => {
  //           if (item.nickname === newUser.nickname) {
  //             message = {
  //               ...message,
  //               nickname: "Este nombre de usuario ya existe.",
  //             };
  //             console.log("ENTRO MSG");
  //           }
  //           if (item.email === newUser.email) {
  //             message = {
  //               ...message,
  //               email: "Este email ya está registrado.",
  //             };
  //             console.log("ENTRO EMAIL");
  //           }
  //           console.log(message);
  //         });
  //         res.status(422).send({ message, status: 422 });
  //       } else {
  //         // res.status(200).json({ message: "ok", status: 200 });

  //         //Save the user in the DB
  //         connection.query(
  //           "INSERT INTO Users (nickname, password, email) VALUES (?, ?, ?)",
  //           [newUser.nickname, newUser.password, newUser.email],
  //           (err, results) => {
  //             if (err) {
  //               if (err.code === "ER_DUP_ENTRY") {
  //                 res
  //                   .status(500)
  //                   .send({ message: "Este usuario ya existe.", err });
  //               } else {
  //                 res.status(404).send({
  //                   message: "Ha ocurrido un error, vuelva a intentar.",
  //                   err,
  //                 });
  //               }
  //             } else {
  //               res
  //                 .status(200)
  //                 .send({ message: "Usuario creado.", status: 200 });
  //             }
  //           }
  //         );
  //         // When done with the connection, release it.
  //         connection.release();
  //       }
  //     }
  //   );
  // });

  // pool.query(
  //   "SELECT nickname, email from Users WHERE nickname = ? OR email = ? ",
  //   [newUser.nickname, newUser.email],
  //   (err, results) => {
  //     if (err) {
  //       res.status(500).send({ message: "Ha ocurrido un error.", status: 500 });
  //     }
  //     if (results.length > 0) {
  //       let message = {};
  //       results.forEach((item) => {
  //         if (item.nickname === newUser.nickname)
  //           message = {
  //             nickname: "Este nombre de usuario ya existe.",
  //           };
  //         if (item.email === newUser.email)
  //           message = {
  //             email: "Este email ya está registrado.",
  //           };
  //       });
  //       res.status(422).send({ message, status: 422 });
  //     } else {
  //       res.status(200).json({ message: "ok", status: 200 });
  //     }
  //   }
  // );

  //Save the user in the DB
  //   pool.query(
  //     "INSERT INTO Users (nickname, password, email) VALUES (?, ?, ?)",
  //     [newUser.nickname, newUser.password, newUser.email],
  //     (err, results) => {
  //       if (err) {
  //         if (err.code === "ER_DUP_ENTRY") {
  //           res.status(500).send({ message: "Este usuario ya existe.", err });
  //         } else {
  //           res.status(404).send({
  //             message: "Ha ocurrido un error, vuelva a intentar.",
  //             err,
  //           });
  //         }
  //       } else {
  //         res.status(200).send({ results, status: 200 });
  //       }
  //     }
  //   );
}

module.exports = {
  SignUp,
};
