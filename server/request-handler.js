// adding objectId because client needs it
var storage = [];
var requestHandler = function(request, response) {
   // var headers = defaultCorsHeaders;
  
   var sendResponse = function(response, data, statusCode) {
    statusCode = statusCode || 200;
    response.writeHead(statusCode, defaultCorsHeaders);    
    response.end(JSON.stringify(data));
   }

   
   console.log("Serving request type " + request.method + " for url " + request.url);
   // request.url.substr(0,9) === '/classes/'
   if(request.url.match( /^\/classes\// )) {

     if(request.method === 'GET') {
       sendResponse(response, { results: storage } );
     } else if(request.method === 'POST') {      
       var body = "";
       request.on('data', function(pieces) {
        body+=pieces;      
       });

       request.on('end', function() {
         var post = JSON.parse(body);
         post.objectId = storage.length;
         storage[post.objectId] = post; 
        sendResponse(response, "This is a post",201);
       })
      } else if (request.method === 'OPTIONS') 
      {
        sendResponse(response, "for CORS");
      }

    } else {
      sendResponse(response,'Not found',404);
    }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

module.exports = requestHandler;

// var fs = require("fs");
// var ROOT_DIR = '../client';

// var requestHandler = function(request, response) {
 
//   var fileName = request.url;
//   console.log("Serving request type " + request.method + " for url " + request.url);
//   if(fileName === '/') fileName = '/index.html';

//   // The outgoing status.
//   // var statusCode = 200;
//   var headers = defaultCorsHeaders;

//   if (fileName==='/chatterbox') {

//     // chatterboxAPI
//     // return {results: [array of message]}
//     // each message is 
//     // {
//     //  createdAt: 'date'
//     // }

//   } else {

//     fs.exists(ROOT_DIR+fileName, function(exists) {
//       if (!exists) {
//         response.writeHead(404);
//         response.end('Not here');
//       }
//     });

//     fs.readFile(ROOT_DIR+fileName, function(err, data){
//       if (err) console.log(err);
//       // response.write(data);
//       response.writeHead(200, headers);
//       response.end(data);
//     });

//   } 

// };

