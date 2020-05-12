/* Initialising socket */ 
let socket = io();

/* Send messages on press of enter key */
document.getElementById("sing-msg").addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        // event.preventDefault
        sendMessage()
    }
})
function sendMessage(){
    let message = document.getElementById("sing-msg").value;

     /* checks if message field is empty */
    if(isEmpty(message)){
        /* If empty this block of code runs */
        /* Do nothing */
    }
    else{
        socket.emit('chat-message', message);
    }
    document.getElementById("sing-msg").value = "";
    // console.log(message);
}

socket.on('chat-message', function(msgData){
    if(msgData.identity === socket.id){
        document.getElementById('message-screen').innerHTML += `<div class="d-flex msg-cont-own"><h3 class="p-2 my-1">${msgData.msg}</h3></div>`;

    }
    else{
        document.getElementById('message-screen').innerHTML += `<div class="d-flex flex-column msg-cont"><p class="message-info">${msgData.user}</p><h3 class="p-2 my-1">${msgData.msg}</h3></div>`;
    }
})
