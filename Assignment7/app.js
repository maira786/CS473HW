/*
run the app:
     $ DEBUG=Assignment7:* ./bin/www
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var redis = require("redis");
var shortid = require('shortid');
//var client = redis.createClient(3000, "localhost");
/*if (process.env.REDISTOGO_URL) {
    var rtg  = require("url").parse(process.env.REDISTOGO_URL);
    var client = require("redis").createClient(3000, 'localhost');
    client.auth(rtg.auth.split(":")[1]);
} else {
    var client = require('redis').createClient();
}*/

var app = express();

var myUrl = 'http://localhost:3000';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('myUrl', myUrl);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//var init_key= 10* 36 ** 3;
var init_key= 10* 36 * 3;

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index');
});

/* POST the results. */
app.post('/', function(req, res){
  var input;
  input = req.body.url; //gets the link in the body of the request

  /*////////////////////////////*/
//  var extension = encode(client);
//var extension = encode(myUrl);
 // var manipulatedURL= '';
  //manipulatedURL.append(input, extension);

 // client.set('short:' + extension, input);
 // client.setnx('long:' + input, manipulatedURL);

 // client.set(myUrl, extension, function () {
    var extension = shortid.generate();
    res.render('result', {myUrl: myUrl, extension: extension});
  //});
});
app.route('/:extension').all(function(req, res){
  var extension = req.params.extension.trim();
  res.status(301);
  res.set('Location', reply);
  res.send();

});
/*
//var encode = function (client){
var encode = function (myUrl){
 //   client.setnx('next', init_key);
    var incr= Math.floor(Math.random()*11); //generates randome number from 0 to 10
//    value = client.incr('next', incr);
    value = incr;
    console.log("in the encode function");
    return base36encode(value);
};
function base36encode(number){
    var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var base36 = '';
    var sign = '';
    var i;

    if (number < 0){
      sign = '-';
      number = -number;
    }

    if (0 <= number && number< alphabet.length){
      return sign.append(alphabet[number]);
    }

    while (number !== 0){
      number = number/ alphabet.length;
      i = number % alphabet.length;     
      base36.append(alphabet[i], base36);
    }
    var output= sign;
    output = output.append(base36);
    console.log(base36);
    return output;
}*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
