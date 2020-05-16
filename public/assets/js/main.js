//  let userName;
localStorage.removeItem("roomToJoin");

function createRoom(){
    let getData = new XMLHttpRequest();
    getData.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            
            document.getElementById("chat-area").innerHTML = this.responseText;
        }
    }
    getData.open("GET", "/createRoom.html" , true);
    getData.send();
}

function enterRoom(){
    let getData = new XMLHttpRequest();
    getData.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            
            document.getElementById("chat-area").innerHTML = this.responseText;
        }
    }
    getData.open("GET", "/enterRoom.html" , true);
    getData.send();
}

 /* to check is username field is empty or not */
const isEmpty = str => !str.trim().length;

/*  getting username for processing */
function createAndMainRedirect(){
    let userName = document.getElementById("user-name").value;
    let newRoomName = document.getElementById("new-room-name").value;
    if(isEmpty(userName)){
        alert("Enter a user name");
    }
    else if(isEmpty(newRoomName)){
        alert("Enter new room's name");
    }
    else{
        document.getElementById("user-name").inputMode = "none";
        document.getElementById("new-room-name").inputMode = "none";
        sendUserName(userName);
        sendRoomName(newRoomName);        
        // setTimeout(function() { openChat(userName, newRoomName); }, 500);
        
    }
}

 /* Opens chat */
function openChat(userName, roomName){
    let getData = new XMLHttpRequest();
    getData.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            // loading the chat script only when userName is entered
            // sendUserName(userName);
            // sendRoomName(roomName);
            loadScript();
            document.getElementById("chat-area").innerHTML = this.responseText;
            let h = window.innerHeight;
            document.getElementById("message-screen").style.height = h +"px";
        }
    }
    getData.open("GET", "/chatPage.html" , true);
    getData.send();
    
}

/* This function loads main chat script which has socket initialising in it */
function loadScript(){
    let getData = new XMLHttpRequest();
    getData.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            // console.log("we in")
            document.getElementById("chat-script").innerHTML = this.responseText;
        }
    }
    getData.open("GET", "/assets/js/chat.js" , true);
    getData.send();
}

/* Sends roomName to server */
function sendRoomName(x){
    let roomName = {
        room : x
    }
    roomName = JSON.stringify(roomName);
    let xhttp = new XMLHttpRequest();
    
    /* https://me-anon-chat.herokuapp.com instead of http://localhost:3000 before pushing */
    xhttp.open("POST", "http://localhost:3000/getRoom", true);
    xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
    xhttp.send(roomName);
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(x);
            console.log(this.response)
            if(this.response == "true"){
                localStorage.setItem("roomToJoin", x);
                openChat()
            }
            else{
                alert('A room with same name exists, enter a new name')
            }
            /* if room name is sucessfully sent to server store it in local storage */
        }
    }
}

/* Sends username to server */
function sendUserName(userName){

    let uName = {
        user : userName
    }
    uName = JSON.stringify(uName);
    let xhttp = new XMLHttpRequest();
    
    /* https://me-anon-chat.herokuapp.com instead of http://localhost:3000 before pushing */
    xhttp.open("POST", "http://localhost:3000/getUser", true);
    xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
    xhttp.send(uName);
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            // If the username is sucessfully sent to server
            console.log('UserName sucessfully registered')
        }
    }
    
}


/* If chat is sucessfully loaded and want to see active members */
let stateCheck = 0;
function showMembers(){
    let x = document.querySelector(".members");
    if(stateCheck === 0){
        let getUnames = new XMLHttpRequest();
    
        /* https://me-anon-chat.herokuapp.com instead of http://localhost:3000 before pushing */
        getUnames.open("POST", "http://localhost:3000/getAllUsers", true);
        getUnames.setRequestHeader("Content-Type","application/json; charset=utf-8");
        getUnames.send();
        getUnames.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.response);
                let x = document.querySelector(".members");
                x.innerHTML = `<h2 class="px-1">Currently Online:</h2>`;
                for(let i = 0; i < data.length; i++){
                    x.innerHTML += `<h3 class="px-1">${data[i]}</h3>`
                }
                document.querySelector(".members-cont").style.width = "100%"
            }
        }
        stateCheck = 1;
    }
    else{
        document.querySelector(".members-cont").style.width = "0%";
        x.innerHTML = ``;
        stateCheck = 0
    }
}

