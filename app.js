var express = require('express'),
  	mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/job_app");

mongoose.Promise = global.Promise;
var db = mongoose.connection;


//=================
//Mongoose Schemas
//=================
var jobSchema = new mongoose.Schema({
	jobid: String,
	jobtitle: String,
	jobkeywords: String,
	jobdesc: String,
	joblocation: String
});

var Job = mongoose.model("Job", jobSchema);

var usersSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	location: String,
	phone: Number,
	usertype: String,
	savedjob: [{jobid: Number}]
});

var users = mongoose.model("users", usersSchema);


// ===========
// APP Routes
// ===========



//----------------GET DATA REQ
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/checkUsername', function(req, res) {
  users.find(req.body, function(err,data) {
    if(!err && data.length) {
      res.send(false);
    } else if(!err && (data.length == 0)) {
      res.send(true);
    }
  })
})

app.post('/newAccount', function(req, res) {
  users.create(req.body, function(err, data) {
    if(!err) {
      res.send(data);
    }
  })
})

app.post('/login', function(req, res) {
  users.find(req.body, function(err,data) {
    if(!err && data.length) {
      res.send(true);
    } else if(!err && (data.length == 0)) {
      res.send(false);
    }
  })
})

app.post('/getAccount', function(req, res) {
  users.find(req.body, function(err,data) {
    if(!err && data.length) {
      res.send(data);
    } else if(!err && (data.length == 0)) {
      res.send(false);
    }
  })
})

app.get('/findjobslength', function(req, res) {
  Job.find({}, function(err, data) {
    console.log(data);
    res.send(data);
  })
})

app.post('/postjob', function(req, res) {
  console.log(req.body)
  Job.create(req.body, function(err, data) {
    if(!err) {
      res.send(data);
    }
  })
})

app.post('/findjobs', function(req, res) {

  console.log(req.body);

  Job.find(req.body, function(err,data) {
    if(!err) {
      console.log(data);
      res.send(data);
    }
  })
})
// ===========
// Mongo & App Config
// ===========
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  app.listen(3000, function() {
    console.log("Server connected!!");
  })
  console.log('Mongoose connected!!');
});
