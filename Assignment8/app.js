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

//var redis = require("redis");
//var client = redis.createClient();

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

var linksSchema = new mongoose.Schema({
    inputLink: String,
    outputLink: String,
    shortid: String,
    clickedCount: Number
});

var link = mongoose.model('link', linksSchema);
/*
var input = new link({ inputLink: 'blah', outputLink: 'www.blah.com', clickedCount: 0 });
input.save(function(err)
{
  if (err){
    console.log('couldnt save');
  }
  else
  {
    console.log('aparently saved');
  }
});
var input = new link({ inputLink: 'aslah', outputLink: 'www.aslah.com', clickedCount: 0 });
input.save(function(err)
{
  if (err){
    console.log('couldnt save');
  }
  else
  {
    console.log('aparently saved');
  }
});
console.log(link.shortLink); // 'Silence'

var query = link.find({'inputLink': 'aslah'}).exec(function(err, result) {
  if (!err) {
    console.log(result);
  } else {
      console.log('Error in matching input in query. ' + err);
  }
});*/



/* GET home page. */
app.get('/', function(req, res) {
  res.render('index');
});

/* POST the results. */
app.post('/', function(req, res){
  var input;
  input = req.body.url; //gets the link in the body of the request
  var output;
  console.log('input the user entered: '+ input);

  // find each link with the same input
  var query = link.findOne({ 'inputLink': input }, {_id:0});

  // select the two fields
  query.select('inputLink outputLink');

  // execute the query
  query.exec(function (err, result) {
    if (err || !result){
      console.log('Couldnt find the matching input');

      var extension = shortid.generate();
      var extensionOutput = "/" + extension;
      console.log('added extension short id: '+ extensionOutput);
      //format the url like so http://www.localhost:3000/xxxxxx
      output = myUrl.concat(extensionOutput);
      console.log('output to put in db: '+output);
      var entry = new link({ inputLink: input, outputLink: output, shortid: extension, clickedCount: 0 });
      var entrytwo = new link({ inputLink: output, outputLink: input, shortid: extension, clickedCount: 0 });
      entry.save(function(err){
        if (err){
          console.log('couldnt save');
        }else{
          console.log('aparently saved');
        }
      });
      entrytwo.save(function(err){
        if (err){
          console.log('couldnt save');
        }else{
          console.log('aparently saved');
        }
      });
      res.render('result', {myUrl: output});
    } else{
      //already in the DB
      link.update({inputLink: input}, {$set: {clickedCount: 1}}, function(err, updated) {
        if( err || !updated ) console.log("clicked count not updated");
        else console.log("count updated");
      });
      //console.log('%s is %s.', link.inputLink, link.outputLink); 
       console.log('result', result);
       //var strJSON = '{"result":true,"count":1}';
        var objJSON = eval("(function(){return" + result + ";})()");
      // var jsonObject = result;
       //console.log('output iss...'+ objJSON.outputLink);
       res.render('result', {myUrl: objJSON.outputLink});
    }
  });

/*  //check if output key already exists
  client.exists(input, function(err, reply) {
    if (reply === 1) {
        //the url inputed exsists in redis
        client.get(input, function(err, reply)
        {
          //ouput the result from the database
          res.render('result', {myUrl: reply});
        });
    } else { */
        //the url is new, so generate its short value
        
});

//display the actual link
app.route('/:extension').all(function(req, res){
  var extension = req.params.extension.trim();

  // find each link with the same input
    var query = link.findOne({ 'shortid': extension });

    // select the two fields
    query.select('inputLink');

    // execute the query
    query.exec(function (err, result) {
    //  res.status(301);
      if (err) return console.log(err);
     // res.set('Location', link.inputLink);
      //res.send();
      res.writeHead(301, {Location: link.inputLink});
      res.end();
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
