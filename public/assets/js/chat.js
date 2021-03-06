/* Initialising socket */ 
let socket = io();


/* getting room name to join from local storage  */
let rId = localStorage.getItem("roomToJoin"); 

/* Telling server which room we want to join */
socket.on('connect', function(){
    socket.emit('room', rId)
})

let screenHeight = window.innerHeight - 75 - 43; /* subtracting message send bar height and room detaills display height from total inner window height */

socket.on('rDetails', function(data){
        localStorage.setItem("roomName",  data.roomName);
        document.getElementById("roomDetails").innerHTML = "";
        document.getElementById("roomDetails").innerHTML = `<span class="rDetail d-flex align-items-center">Room Name: &nbsp; <p>${data.roomName}</p></span><span class="rDetail d-flex align-items-center">Room Id: &nbsp; <p>${data.id}</p></span>`;
})

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
    let data = {
        state : x,
        room : rId
    }
    socket.emit('typing', data);
}

function sendMessage(){
    let message = document.getElementById("sing-msg").value;
    message = {
        msg : message,
        room : rId
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
        screenHeight = messageAreaHeight;
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
