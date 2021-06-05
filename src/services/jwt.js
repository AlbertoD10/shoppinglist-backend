const jwt = require("jsonwebtoken");
const { DateTime } = require("luxon");
const SECRET_KEY = "pruebaKey";

createAccessToken = function (user) {
  const payload = {
    user_id: user,
    exp: DateTime.now().plus({ hour: 2 }).toSeconds(),
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

//restart the access token if is active
createRefreshToken = function (user) {
  const payload = {
    user_id: user,
    exp: DateTime.now().plus({ days: 30 }).toSeconds(),
  };

  const token = jwt.sign(payload, SECRET_KEY);
  console.log(token);
  return token;
};

decodedToken = function (token) {
  const verify = jwt.verify(token, SECRET_KEY);

  return verify;
};
module.exports = { createAccessToken, createRefreshToken, decodedToken };
