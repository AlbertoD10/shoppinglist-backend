const express = require("express");
const api = express.Router();
const AuthController = require("../controllers/auth");
const TokenController = require("../controllers/authToken");
const md_auth = require("../middlewares/validations");

api.post("/sign-up", [md_auth.ValidateUser], AuthController.SignUp);
api.post("/login", AuthController.Login);
api.post("/refresh-access-token", TokenController.refreshAcessToken);

module.exports = api;
