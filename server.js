//make express available
const express = require('express');
//make socket io available
const io = require('socket.io');
//turn on express
const app = express();
// Make a server to handle TCP connection...
const server = require('http').Server( app );

//server out files in our public_html folder
app.use(express.static('public_html'));

//turn on our server so it can recieve request.
server.listen(3000, function(){
  console.log('app is listening on port 3000!');
})
