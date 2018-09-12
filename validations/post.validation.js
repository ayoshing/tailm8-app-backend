const validator = require("validator");
const isEmpty = require("./isEmpty");
const checkURL = require("./checkURL");

module.exports = function validatePostInput(input) {
  let errors = {};

  input.content = !isEmpty(input.content) ? input.content : "";

  if (!validator.isLength(input.content, { min: 2, max: 200 })) {
    errors.content = "Post must be between 2 and 200 characters";
  }

  if (validator.isEmpty(input.content)) {
    errors.content = "Content field is required";
  }

  if (!validator.isURL(input.imgUrl)) {
    errors.imgUrl = "Invalid URL";
  }

  if (!checkURL(input.imgUrl)) {
    errors.imgUrl = "Invalid URL";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
