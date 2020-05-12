// let userName;

// to check is username field is empty or not
const isEmpty = str => !str.trim().length;

// getting username for processing
function mainRedirect(){
    let userName = document.getElementById("user-name").value;
    if(isEmpty(userName)){
        alert("Enter a user name")
    }
    else{
        openChat(userName)
    }
}

// Opens chat
function openChat(userName){
    let getData = new XMLHttpRequest();
    getData.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            // console.log("we in")
            document.getElementById("chat-area").innerHTML = this.responseText;
            var h = window.innerHeight;
            document.getElementById("message-screen").style.height = h +"px";
        }
    }
    getData.open("GET", "/chatPage.html" , true);
    getData.send();
    
}
// initialising socket 
let socket = io();


function sendMessage(){
    let message = document.getElementById("sing-msg").value;
    document.getElementById("sing-msg").value = ""
    console.log(message)
    socket.emit('chat-message', message);
}

socket.on('chat-message', function(message){
    document.getElementById('message-screen').innerHTML += `<div class="msg-cont"><h3 class="p-2 my-1">${message}</h3></div>`
})