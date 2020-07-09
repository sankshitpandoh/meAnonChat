//  let userName;
localStorage.removeItem("roomToJoin");
localStorage.removeItem("roomName");

defaultLanding();

function defaultLanding(){
    let getData = new XMLHttpRequest();
    getData.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            
            document.getElementById("chat-area").innerHTML = this.responseText;
        }
    }
    getData.open("GET", "/landing.html" , true);
    getData.send();
}

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

 /* to check if fields are empty or not */
const isEmpty = str => !str.trim().length;

/*  getting username and room name for processing when user creates a new room */
function createAndMainRedirect(){
    let userName = document.getElementById("user-name").value;
    let newRoomName = document.getElementById("new-room-name").value;
    if(isEmpty(userName)){
        alert("Enter a user name");
    }
    else if(isEmpty(newRoomName)){
        alert("New room's name field cannot be empty");
    }
    else{
        document.getElementById("user-name").inputMode = "none";
        document.getElementById("new-room-name").inputMode = "none";
        sendRoomName(newRoomName,userName);        
        // setTimeout(function() { openChat(userName, newRoomName); }, 500);
        
    }
}

/* When user asks to join an existing room */
function enterAndMainRedirect(){
    let userName = document.getElementById("user-name").value;
    let roomId = document.getElementById("room-join-id").value;
    if(isEmpty(userName)){
        alert("Enter a user name");
    }
    else if(isEmpty(roomId)){
        alert("New room's name field cannot be empty");
    }
    else{
        checkRoomId(roomId, userName);
    }
}

function checkRoomId(x,y){
    let roomId = {
        id : x
    }
    roomId = JSON.stringify(roomId);
    let xhttp = new XMLHttpRequest();
    
    /* https://me-anon-chat.herokuapp.com instead of https://me-anon-chat.herokuapp.com before pushing */
    xhttp.open("POST", "https://my-anon-chat-server.herokuapp.com/checkRoom", true);
    xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
    xhttp.send(roomId);
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(x);
            console.log(this.response)
            if(this.response == "false"){
                alert('A room with this Id doesnot exist');
                document.getElementById("room-join-id").value = ""
            }
            else{
                /* if room Id exists then*/
                localStorage.setItem("roomToJoin", x);
                sendUserName(y)
                openChat()
            }
        }
    }
}

 /* Opens chat after a new room has been created or confirmed*/
function openChat(){
    let getData = new XMLHttpRequest();
    getData.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            /* loading the chat script to main document */
            loadScript();
            document.getElementById("chat-area").innerHTML = this.responseText;
            let h = window.innerHeight - 75 - 43; /* subtracting message send bar height and room detaills display height */
            // console.log(h)
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

/* Sends roomName to server for processing */
function sendRoomName(x,y){
    let roomName = {
        room : x
    }
    roomName = JSON.stringify(roomName);
    let xhttp = new XMLHttpRequest();
    
    /* https://me-anon-chat.herokuapp.com instead of https://me-anon-chat.herokuapp.com before pushing */
    xhttp.open("POST", "https://my-anon-chat-server.herokuapp.com/getRoom", true);
    xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
    xhttp.send(roomName);
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(x);
            console.log(this.response)
            if(this.response == "false"){
                alert('Oh snap! An error occured, try again please')
            }
            else{
                /* if room name is sucessfully sent to server store the response which contains room id in local storage */
                localStorage.setItem("roomToJoin", this.response);
                sendUserName(y);
                openChat()
            }
        }
    }
}

/* Sends username to server */
function sendUserName(userName){

    let x = localStorage.getItem("roomToJoin");

    let uName = {
        user : userName,
        whichRoom : x
    }
    uName = JSON.stringify(uName);
    let xhttp = new XMLHttpRequest();
    
    /* https://me-anon-chat.herokuapp.com instead of https://me-anon-chat.herokuapp.com before pushing */
    xhttp.open("POST", "https://my-anon-chat-server.herokuapp.com/getUser", true);
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
        let d = localStorage.getItem("roomToJoin");
        let details = {
            id : d
        }
        details = JSON.stringify(details);
        let getUnames = new XMLHttpRequest();
    
        /* https://me-anon-chat.herokuapp.com instead of https://me-anon-chat.herokuapp.com before pushing */
        getUnames.open("POST", "https://my-anon-chat-server.herokuapp.com/getAllUsers", true);
        getUnames.setRequestHeader("Content-Type","application/json; charset=utf-8");
        getUnames.send(details);
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

