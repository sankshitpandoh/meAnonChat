let express = require("express");
let http = require('http');
const bodyParser = require("body-parser");
let app = express();
let server = http.Server(app);
let io = require("socket.io")(server);

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
//   });

app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb', extended: true}));

/* Start Listening */
server.listen(3000 , function(){
    let host = server.address().address;
    let port = server.address().port;

    console.log("Anon chat is live on localhost at port :",port)

})

io.on('connection', function(socket){
    console.log(' a user has entered');
    socket.on('chat-message', function(message){
        console.log('message: ' + message)
        io.emit('chat-message', message)
    })
    socket.on('disconnect', function(){
        console.log(' a user has left ')
    })
})