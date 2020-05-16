/* Initialising socket */ 
let socket = io();


/* getting room name to join from local storage  */
let rName = localStorage.getItem("roomToJoin"); 

/* Telling server which room we want to join */
socket.on('connect', function(){
    socket.emit('room', rName)
})

let screenHeight = window.innerHeight;

/* Send messages on press of enter key */
document.getElementById("sing-msg").addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        // event.preventDefault
        sendMessage();
    }
    else{
        let typing = true;
        Usertyping(typing);
    }
})

function Usertyping(x){
    socket.emit('typing', x);
}

function sendMessage(){
    let message = document.getElementById("sing-msg").value;
    message = {
        msg : message,
        room : rName
    }

     /* checks if message field is empty */
    if(isEmpty(message.msg)){
        /* If empty this block of code runs */
        /* Do nothing */
    }
    else{
        socket.emit('chat-message', message);
        let typing = false;
        Usertyping(typing);
    }
    document.getElementById("sing-msg").value = "";
    // console.log(message);
}

socket.on('chat-message', function(msgData){
    console.log(msgData)
    if(msgData.identity === socket.id){
        document.getElementById('message-screen').innerHTML += `<div class="d-flex msg-cont-own"><h3 class="p-2 my-1">${msgData.msg}</h3></div>`;

    }
    else{
        document.getElementById('message-screen').innerHTML += `<div class="d-flex flex-column msg-cont"><p class="message-info">${msgData.user}</p><h3 class="p-2 my-1">${msgData.msg}</h3></div>`;
    }

    /* To auto scroll chat if exceeds viewport */
    let messageAreaHeight = document.getElementById("message-screen").scrollHeight
    if(messageAreaHeight > screenHeight){
        document.getElementById("message-screen").scrollTop = messageAreaHeight;
        screenHeight = messageAreaHeight
    }
})

socket.on('is-typing' , function(typingData){
    if(typingData.identity === socket.id){

    }
    else if(typingData.stateType === true){
        document.getElementById("is-typing").innerHTML = `<p class="p-1">${typingData.user} is typing ...</p>`;
        document.getElementById("is-typing").style.maxWidth = "50%";
    }
    else{
        document.getElementById("is-typing").innerHTML = "";
        document.getElementById("is-typing").style.maxWidth = "0px";
    }
})
