$("#mainPage").hide();


var socket = io();
socket.on('connect',function(){
  console.log('connected');

});
$("#login").click(function(){

  socket.emit("register",{
    user:$("#uName").val()
  })

});

socket.on('login',function(data){
  socket.user = data.thisUser;
  $("#startPage").hide();
  $("#mainPage").show();
  updateUserList(data.allUsers);
});

socket.on('userUpdate',function(users){
  updateUserList(users);
});

function updateUserList(users){
  $("ul").empty();
  users.forEach(function(data){
  
    $("#ul").append(`<li>${data}</li>`);
  });
}
