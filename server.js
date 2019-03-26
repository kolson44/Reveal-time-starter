//make express available
const express = require('express');

//turn on express
const app = express();
// Make a server to handle TCP connection...
const server = require('http').Server( app );

//make socket io available
const io = require('socket.io')(server);

//server out files in our public_html folder
app.use(express.static('public_html'));



io.on('connect', function(socket){


  //log out the unique
  console.log(socket.id);

  socket.on('colorchange', function(incomingColorData){
    console.log(incomingColorData)

    io.emit('resultColorChange', incomingColorData)

  })

})



//game timer functionality
var timeleft = 30; //total game play time including menus

//this timer loops forever!
var downloadTimer = setInterval(function(){

  timeleft -= 1; //count down the timer

  //send universal timer down to everyone
  io.emit('count', timeleft)

  //-15 is the buffer for the points notification
  if(timeleft <= -15){
    //timer finsihes
    timeleft = 30

  }// close the loop that looks at each grid child



}, 1000); //every second


let port = process.env.PORT || 3000 ;

//turn on our server so it can recieve request.
server.listen(3000, function(){
  console.log('app is listening on port 3000!');
})
