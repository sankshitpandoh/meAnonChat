let express = require("express");
let http = require('http');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
let app = express();
let server = http.Server(app);
let io = require("socket.io")(server);


app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb', extended: true}));

/* Start Listening */
server.listen(port , function(){
    let host = server.address().address;
    let port = server.address().port;

    console.log("Anon chat is live on localhost at port :",port)

})

/* main array that contains user data - userName and socket id's */
let userArray = []

/* main array that contains room information - names */
let rooms = []

io.on('connection', function(socket){
    console.log(' a user has entered ' + socket.id + user);
    /* creating an object everytime a user joins */
    let uInfo = {
        userName : user,
        userId : socket.id
    }

    /* pushing the obect in main array */
    userArray.push(uInfo)
    console.log(userArray)

    /* When chat-message event is received */
    socket.on('chat-message', function(message){

        /* stores the userName from whom the message is received */
        let msgUser;

        /* Loops through the main array to get the userName by matching socket id */
        for(let i = 0; i < userArray.length; i++){
            if(userArray[i].userId === socket.id){
                msgUser = userArray[i].userName;
                break; 
            }
        }

        /* message object that contains message, user name and socket id of sender */
        let msgData = {
            msg : message,
            identity : socket.id,
            user: msgUser
        }
        // console.log('message: ' + message + " " + socket.id)

        /* emits the message object to all connected sockets */
        io.emit('chat-message', msgData);
    });

    /* when a user is typing event is received  */
    socket.on('typing', function(typing){

        let typingData;
        /* Loops through the main array to get the userName by matching socket id */
        for(let i = 0; i < userArray.length; i++){
            if(userArray[i].userId === socket.id){
                typingData = {
                    identity : socket.id,
                    stateType : typing,
                    user : userArray[i].userName
                }
                break;
            }
        }
        /* emits the who is typing object to all connected sockets */
        io.emit('is-typing' , typingData);

    })
    socket.on('disconnect', function(){
        console.log(' a user has left ' + socket.id)
        for(let i = 0; i < userArray.length; i++){
            if(userArray[i].userId === socket.id){
                userArray.splice(i,1);
                break;
            }
        }
    })
})

let user
app.post("/getUser", function(req, res){
    console.log(req.body.user);
    user = req.body.user;
    res.send("request processed");
})


app.post("/getAllUsers", function(req, res){
    let allUsers = [];
    for(let i = 0; i < userArray.length; i++){
        allUsers.push(userArray[i].userName);
    }
    allUsers = JSON.stringify(allUsers);
    res.send(allUsers);
})

app.post("/getRoom", function(req,res){
    let r = {
        roomName = req.body.room,
        creator = user
    }
    rooms.push(r);
    res.send("Room generated sucessfully")
})
/* To DO
 Add differnt room functionality */