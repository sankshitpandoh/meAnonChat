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
let userArray = []
io.on('connection', function(socket){
    console.log(' a user has entered ' + socket.id + user);
    let uInfo = {
        userName : user,
        userId : socket.id
    }
    userArray.push(uInfo)
    console.log(userArray)
    socket.on('chat-message', function(message){
        console.log('message: ' + message + " " + socket.id)
        io.emit('chat-message', message)
    })
    socket.on('disconnect', function(){
        console.log(' a user has left ' + socket.id)
        for(let i = 0; i < userArray.length; i++){
            if(userArray[i].userId === socket.id){
                userArray.splice(i,1)
            }
        }
    })
})

let user
app.post("/getUser", function(req, res){
    console.log(req.body.user)
    user = req.body.user
    res.send("request processed")
})