var http = require("http");
var io = require('socket.io');

var port = 3000;
var ip = "127.0.0.1";
var handleRequest = require('./request-handler') 

var server = http.createServer(handleRequest);

console.log("Listening on http://" + ip + ":" + port);

server.listen(port, ip);
var socket = io.listen(server);

var storage = [];
socket.on('connection', function(client) {

  socket.emit('new-message', {results: storage});

  client.on('send-message', function(data) {
      data.objectId = storage.length.toString();
      storage[data.objectId] = data; 
      console.log('Received : '+data);
      socket.emit('new-message', {results: storage});
  });

});

