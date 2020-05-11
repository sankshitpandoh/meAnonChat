let express = require("express");
const bodyParser = require("body-parser");
let app = express();

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
//   });

app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb', extended: true}));

/* Start Listening */
let server = app.listen(3000 , function(){
    let host = server.address().address;
    let port = server.address().port;

    console.log("Anon chat is live on localhost at port :",port)

})