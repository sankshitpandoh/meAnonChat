// initialising socket 
let socket = io();
console.log('loaded')

/* Get socket id  */

// socket.on('connect', () => {

//  });

function sendMessage(){
    let message = document.getElementById("sing-msg").value;
     /* checks if message field is empty */
    if(isEmpty(message)){}
    else{
        socket.emit('chat-message', message);
    }
    document.getElementById("sing-msg").value = ""
    console.log(message)
}

socket.on('chat-message', function(message){
    document.getElementById('message-screen').innerHTML += `<div class="msg-cont"><h3 class="p-2 my-1">${message}</h3></div>`
})