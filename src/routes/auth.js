const express = require("express");
const api = express.Router();
const AuthController = require("../controllers/auth");

api.post("/sign-up", AuthController.SignUp);

module.exports = api;
