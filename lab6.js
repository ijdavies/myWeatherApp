// 1- install a new route
// 2- read the cities file
// 3- look for prefix
// 4- send back JSON list of cities

var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  //install new route
  console.log("URL path"+urlObj.pathname);
  console.log("URL search"+urlObj.search);
  console.log("URL query"+urlObj.query["q"]);
  //if this is our REST service
  if(urlObj.pathname.indexOf("getcity") != -1){ //make route more specific?
    console.log(urlObj);
    console.log("In Getcity");
    // read from cities file 
    fs.readFile("cities.dat.txt", function (err,data){
      if(err) throw err;
      var cities = (data.toString().split("\n"));
      var myRe = new RegExp("^"+urlObj.query["q"]);
      var jsonresult = [];
      // now look up the query in the file
      for (var i = 0; i < cities.length; i++){
        //console.log("City: " + cities[i]);
        console.log(myRe);
        var result = cities[i].search(myRe);
        if(result != -1) {
          // console.log(cities[i]);
          jsonresult.push({city:cities[i]});
        }
      }
      // console.log(jsonresult);
      // console.log(JSON.stringify(jsonresult));
      res.writeHead(200);
      res.end(JSON.stringify(jsonresult));
    });
  }
  else{
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
    });
  }
  
}).listen(80);

/* the following stuff acts like a we client to test what we just wrote

var options = {
    hostname: 'localhost',
    port: '80',
    path: '/hello.html'
  };
function handleResponse(response) {
  var serverData = '';
  response.on('data', function (chunk) {
    serverData += chunk;
  });
  response.on('end', function () {
    console.log(serverData);
  });
}
http.request(options, function(response){
  handleResponse(response);
}).end(); */


//use wget + url to copy files onto amazon server
// run with sudo static node <filename>.js

// go to godaddy.com to get a domain name to hook up to my amazon server



// https://students.cs.byu.edu/~clement/CS360/AWS-tutorial.pdf

// https://students.cs.byu.edu/~clement/CS360/git.html

// https://students.cs.byu.edu/~clement/CS360/npm.html

// https://students.cs.byu.edu/~clement/CS360/nodehints.html

// https://students.cs.byu.edu/~clement/CS360/AWS-tutorial.pdf

// https://students.cs.byu.edu/~clement/CS360/labs/webtest/

// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development/tree/master/ch07

// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development/

// https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development/blob/master/ch07/http_server_static.js
