// initialising socket 
let socket = io();

 /* to check is username field is empty or not */
//  const isEmpty = str => !str.trim().length;

// socket.on('connect', () => {

//  });

function sendMessage(){
    let message = document.getElementById("sing-msg").value;
     /* checks if message field is empty */
    if(isEmpty(message)){

    }
    else{
        socket.emit('chat-message', message);
    }
    document.getElementById("sing-msg").value = ""
    console.log(message)
}

socket.on('chat-message', function(msgData){
    if(msgData.identity === socket.id){
        document.getElementById('message-screen').innerHTML += `<div class="d-flex msg-cont-own"><h3 class="p-2 my-1">${msgData.msg}</h3></div>`

    }
    else{
        document.getElementById('message-screen').innerHTML += `<div class="d-flex msg-cont"><h3 class="p-2 my-1">${msgData.msg}</h3></div>`
    }
    console.log(socket.id)
})