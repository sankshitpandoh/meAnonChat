let socket = io();

function sendMessage(){
    let message = document.getElementById("sing-msg").value;
    document.getElementById("sing-msg").value = ""
    console.log(message)
    socket.emit('chat-message', message);
}

socket.on('chat-message', function(message){
    document.getElementById('message-screen').innerHTML += `<h3>${message}</h3>`
})