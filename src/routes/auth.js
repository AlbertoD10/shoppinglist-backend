const express = require("express");
const api = express.Router();
const AuthController = require("../controllers/auth");
const md_auth = require("../middlewares/validations");

api.post("/sign-up", [md_auth.ValidateUser], AuthController.SignUp);
api.post("/login", AuthController.Login);

module.exports = api;
