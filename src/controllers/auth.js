const Sign = require("../models/auth");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("../services/jwt");

function SignUp(req, res) {
  const password = req.body.password;
  let newUser = {
    nickname: req.body.nickname,
    password: "",
    email: req.body.email,
  };

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).send({ message: "Ha ocurrido un error", status: 500 });
    } else {
      newUser.password = hash;
      //Send the data to the model and  get a callback with the response of the DB
      Sign.SignUpModel(newUser, (result) => {
        console.log(result);
        res.status(result.status).send(result);
      });
    }
  });
}

function Login(req, res) {
  const user = req.body;
  Sign.LoginModel(user, (result) => {
    bcrypt.compare(user.password, result.password, function (err, isValid) {
      if (err) {
        createAccessToken;
        console.log(err);
        res.status(500).send({ message: "Ha ocurrido un error", status: 500 });
      } else {
        if (isValid) {
          jwt.createAccessToken(result.user_id);
          jwt.createRefreshToken(result.user_id);
          res.status(200).send({ message: "Bienvenido", status: 200 });
        } else {
          res
            .status(404)
            .send({ message: "Contraseña incorrecta", status: 500 });
        }
      }
    });
  });
}

module.exports = {
  SignUp,
  Login,
};
