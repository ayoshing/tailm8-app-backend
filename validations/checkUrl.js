const checkURL = url => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

module.exports = checkURL;
