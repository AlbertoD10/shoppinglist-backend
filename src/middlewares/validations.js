const { check, validationResult } = require("express-validator");

const ValidateUser = [
  check("email").isEmail().withMessage("Email no válido").normalizeEmail(),
  check("nickname")
    .notEmpty()
    .withMessage("Ingrese un nickname")
    .not()
    .isEmail()
    .withMessage("El nickname no puede ser un email")
    .trim(),
  check(["password", "repeatpassword"])
    .notEmpty()
    .withMessage("Ingrese la contraseña")
    .custom((value, { req }) => value === req.body.repeatpassword)
    .withMessage("Las contraseñas tienen que ser iguales"),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const ValidateProducts = [
  check("product_name").notEmpty().withMessage("Ingrese nombre del producto"),
  check(["quantity", "product_price"])
    .isNumeric()
    .withMessage("Valor invalido"),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  ValidateUser,
  ValidateProducts,
};
