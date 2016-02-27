var express = require('express');
var FieldSocket = require('./public/fieldsocket.js');
var cors = require('cors');

var app = express();
var fs = new FieldSocket();
var lg = console.log;
var portNum = process.env.PORT || 3000;
app.use(cors())

app.get('/remote/handshake/:id/:name', function(req, res, next){
	try{
		var id = req.params.id;
		var name = req.params.name;
		lg("New player handshake established:");
		lg("Player ID: ", id);
		lg("Player Name: ", name);
		var works = fs.joinField(id, name)
		if (works){
			res.send({connection: true});
		}else{
			res.send({connection: false});
		}
	}catch(err){
		next(err);
	}
});

app.get('/remote/requestproblem/:id', function(req, res, next){
	try{
		var id = parseInt(req.params.id);
		lg("Problem requested:");
		lg("Player ID: ", id);
		var state = fs.requestProblem(id);
		if(!!state){
			lg("Sending state...")
			res.send({state: state});
		}else{
			lg("No state to send...")
			res.send({state: false});
		}
	}catch(err){
		next(err);
	}
});

app.get('/remote/makemove/:id/:move', function(req, res, next){
	try{
		var id = req.params.id;
		var move = req.params.move;
		lg("Move attempt made:");
		lg("Player Id: ", id);
		lg("Move: ", move);
		var moved = fs.solveProblem(id, move);
		if(moved){
			res.send({message: true});
		}else{
			res.send({message: false});
		}
	}catch(err){
		next(err);
	}
});

app.get('/remote/leaderboard', function(req, res, next){
	try{
	 	console.log("Request for leaderboard:" + (new Date()))
	 	res.send({players: fs.leaderboard()});
	 }catch(err){
	 	next(err);
	 }
 });

app.get('/remote/info', function(req, res, next){
	try{
		res.send({port: portNum});
	}catch(err){
		next(err);
	}
})

app.use(function(err, req, res, next){
	console.error(err);
	res.send({error: 'Something went wrong', err: err});
});


app.listen(portNum, function(){
	console.log("Listening on port " + portNum);
});

