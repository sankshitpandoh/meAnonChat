//  let userName;

 /* to check is username field is empty or not */
const isEmpty = str => !str.trim().length;

/*  getting username for processing */
function mainRedirect(){
    let userName = document.getElementById("user-name").value;
    if(isEmpty(userName)){
        alert("Enter a user name")
    }
    else{
        document.getElementById("user-name").inputMode = "none";
        setTimeout(function() { openChat(userName); }, 500);
        
    }
}

 /* Opens chat */
function openChat(userName){
    let getData = new XMLHttpRequest();
    getData.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            // loading the chat script only when userName is entered
            sendUserName(userName)
            loadScript(userName)
            document.getElementById("chat-area").innerHTML = this.responseText;
            var h = window.innerHeight;
            document.getElementById("message-screen").style.height = h +"px";
        }
    }
    getData.open("GET", "/chatPage.html" , true);
    getData.send();
    
}
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

function sendUserName(userName){

    let uName = {
        user : userName
    }
    uName = JSON.stringify(uName);
    let xhttp = new XMLHttpRequest();

    /* https://me-anon-chat.herokuapp.com instead of http://localhost:3000 before pushing */
    xhttp.open("POST", "https://me-anon-chat.herokuapp.com/getUser", true);
    xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
    xhttp.send(uName);
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            // If the username is sucessfully sent to server
            console.log('UserName sucessfully registered')
        }
    }
    
}