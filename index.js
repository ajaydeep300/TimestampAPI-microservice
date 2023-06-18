// index.js
// init project


var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

var bodyParser = require('body-parser');
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json());



app.get('/api/:dateVal', function(req, res){
  var date = req.params.dateVal;

  let unixr, utcr;

  if((new Date(parseInt(date))).toString() === "Invalid Date") {
    res.json({error: 'Invalid Date'});
  }

  else if(date.indexOf("-") < 0 && date.indexOf(' ') === -1 && (new Date(parseInt(date))).getTime() === parseInt(date)){
    unixr = parseInt(date);
    utcr = (new Date(unixr)).toUTCString();
    res.json({unix: unixr, utc: utcr});
  }
  else{
    unixr = (new Date(date)).getTime();
    utcr = (new Date(unixr)).toUTCString();
    res.json({unix: unixr, utc: utcr});
  }
  console.log('url works');
})
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});