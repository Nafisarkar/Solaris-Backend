import { body } from "express-validator";

const signupValidatorRules = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 chars")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Name must contain only letters, numbers, and underscore"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 chars")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  body("address")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Address must be between 3 and 100 chars"),
  body("phone")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone must be between 10 and 15 chars")
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    .withMessage("Phone must be a valid phone number"),
];

const loginValidatorRules = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("The minimum password length is 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
];

export { signupValidatorRules, loginValidatorRules };
