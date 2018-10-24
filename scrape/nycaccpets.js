const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
  uri: "https://nycaccpets.shelterbuddy.com/search/searchResults.asp?task=search&searchid=&advanced=&s=lost&animalType=1%2C2%2C15%2C3%2C16%2C15%2C16%2C86%2C79&searchType=1&datelostfoundmonth=10&datelostfoundday=23&datelostfoundyear=2018&state=&find-submitbtn=Find+Animals",
  transform: function (body) {
    return cheerio.load(body);
  }
}

rp(options)
// can't use arrow function for each method
  .then($ => {
    $('.searchResultsCell').each(function(i, el) {
      let lostDogs = [];
      lostDogs[i] = lostDogFormatter($(this).html());
    })
  })
  .catch(err => console.log(err));

function lostDogFormatter(htmlStr) {
  let obj = {};
  return htmlStr.split('\n');
}
