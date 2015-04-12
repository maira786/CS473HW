/*
run the app:
     $ DEBUG=Assignment8:* ./bin/www
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var mongoose = require('mongoose');

//using mongo lab to host the database 
mongoose.connect('mongodb://assignment8:avery@ds061641.mongolab.com:61641/assignment8');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("yay");
});

var redis = require("redis");
var client = redis.createClient();

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
  var output;

  //check if output key already exists
  client.exists(input, function(err, reply) {
    if (reply === 1) {
        //the url inputed exsists in redis
        client.get(input, function(err, reply)
        {
          //ouput the result from the database
          res.render('result', {myUrl: reply});
        });
    } else {
        //the url is new, so generate its short value
        var extension = shortid.generate();
        var extensionOutput;
        extensionOutput = "/" + extension;
        //format the url like so http://www.localhost:3000/xxxxxx
        output = myUrl.concat(extensionOutput);
        //set long url -> short url
        client.set(input, output, function(err, reply){
            //set short url -> long url
            client.set(output, input);
            //set short id -> long url
            client.set(extension, input);
            //print out output with the short url
            res.render('result', {myUrl: output});
        });
    }
  });
  //doesnt work: client.zrange('hits',0,-1);

});

//display the actual link
app.route('/:extension').all(function(req, res){
  var extension = req.params.extension.trim();

  //get the actual link from Redis
  client.get(extension, function(err, reply){
    res.status(301);

    //doesnt work //client.zincrby('hits', 1, extension);
    //var popular = client.zrevrange('hits', 0, 9, withscores=True);
    //console.log(popular);
    
    //set the location from the redis's reply
    res.set('Location', reply);
    res.send();
  });
});

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
