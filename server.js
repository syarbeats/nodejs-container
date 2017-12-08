var express = require('express');

// Constants
var PORT = 8585;

// App
var app = express();
app.get('/', function (req, res){
  res.send('Hello world from Distelli & Docker!');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
