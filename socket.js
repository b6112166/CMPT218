var port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var socket = require('socket.io')(server);
server.listen(port,function(){
  console.log(`port:${port}`);
});

var options = {
   dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "main.html"
}
//user list
var activeUsers=[];
app.use('/', express.static('./pub',options));
socket.on("connection",function(client){
  console.log('connected');
  client.on("register",function(user){
    activeUsers.push(user);
    printUsers(activeUsers);
    client.emit("login",{
      thisUser:user,
      allUsers:activeUsers
    });
    client.broadcast.emit("userUpdate",{
      users:activeUsers
    });
  });

});

//debug function
function printUsers(data){
  console.log("users");
  data.forEach(function(user){
    console.log(user);
  });
}
