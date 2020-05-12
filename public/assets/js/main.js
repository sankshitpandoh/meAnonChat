let socket = io();
var h = window.innerHeight;
document.getElementById("message-screen").style.height = h +"px";
function sendMessage(){
    let message = document.getElementById("sing-msg").value;
    document.getElementById("sing-msg").value = ""
    console.log(message)
    socket.emit('chat-message', message);
}

socket.on('chat-message', function(message){
    document.getElementById('message-screen').innerHTML += `<div class="msg-cont"><h3 class="p-2 my-1">${message}</h3></div>`
})