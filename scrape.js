var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
request('http://substack.net/images/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
   var $ = cheerio.load(html);

   fs.writeFile('images.csv', "", {'flag': 'w'}, function(err){
    if(err){
      return console.error(err);
    }
    console.log("Data written successfully");

  });
   
   $('tr td:first-child').each(function(i, element){
    var filePermission = $(this).children();
    var absoluteURL = $(this).next().next().children();
    var fileType = $(absoluteURL).text().split(".")[1];

    var metaData = filePermission + absoluteURL + fileType;

    fs.writeFile('images.csv',metaData, {'flag': 'a'}, function(err){
      if(err){
        return console.error(err);
      }
      console.log("Data written successfully");

    });
    
  });

 }

})
