const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(input) {
  let errors = {};

  input.content = !isEmpty(input.content) ? input.content : "";

  if (!validator.isLength(input.content, { min: 2, max: 200 })) {
    errors.content = "Post must be between 2 and 200 characters";
  }

  if (validator.isEmpty(input.content)) {
    errors.content = "Content field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
