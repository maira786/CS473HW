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
  console.log("DB Connection On");
});

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

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index');
});

/* POST the results. */
app.post('/', function(req, res){
  var input;
  input = req.body.url; //gets the link in the body of the request
  var output;
  var objJSONLink;

  // find a link with the same input, and do not display "_id"
  var query = link.findOne({ 'inputLink': input }, {_id:0});
  // select the three fields that will be shown to query
  query.select('inputLink outputLink clickedCount');

  var getAllQuery= link.find({}, {_id:0}).sort({clickedCount:-1}).limit(10);
  getAllQuery.select('outputLink');
  getAllQuery.exec(function(err, result){
    if(err){
      console.log('couldnt get the queries');
    }else{
      //objJSONLink = eval("(function(){return" + result + ";})()");
      objJSONLink=result;
      console.log('printing.....'+objJSONLink);
    }
  });

  // execute the query and check for errors
  query.exec(function (err, result) {
    if (err || !result){
      //if error, or the result was not found(the input link was not in the DB)
      var extension = shortid.generate();
      var extensionOutput = "/" + extension;
      //format the url like so http://www.localhost:3000/xxxxxx
      output = myUrl.concat(extensionOutput);
      //short to long
      var entry = new link({ inputLink: input, outputLink: output, shortid: extension, clickedCount: 0 });
      //long to short
      var entrytwo = new link({ inputLink: output, outputLink: input, shortid: extension, clickedCount: 0 });
      entry.save(function(err){
        if (err){
          console.log('The link was not stored in the DB');
        }
      });
      entrytwo.save(function(err){
        if (err){
          console.log('The link was not stored in the DB');
        }
      });
      //res.render('result', {myUrl: output, link:objJSONLink});
      res.render('result', {myUrl: output});
    } else{
      //the link the user inputed, already exsists in the DB
      
      //convert the result that the db provided into a json object
      var objJSON = eval("(function(){return" + result + ";})()");
      var count = objJSON.clickedCount;
      count+=1;
      //for the inputed link, update(set) it clicked count up
      link.update({inputLink: input}, {$set: {clickedCount: count}}, function(err, updated) {
        if( err || !updated ){
          console.log("clicked count not updated");
        }
      });//end of update
      //res.render('result', {myUrl: objJSON.outputLink, link:objJSONLink});
      res.render('result', {myUrl: objJSON.outputLink});

      /*
      to be placed in jade
      
                <!--
                -each link in result
          li #{link.outputLink}
        -->
      */



    }//end of else loop
  });//end of query exec
});//end of post

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
