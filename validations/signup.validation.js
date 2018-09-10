const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateSignUpInput(input) {
  let errors = {};

  input.name = !isEmpty(input.name) ? input.name : "";
  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";
  input.password2 = !isEmpty(input.password2) ? input.password2 : "";

  if (!validator.isLength(input.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(input.name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(input.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(input.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(input.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(input.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(input.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!validator.equals(input.password, input.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
