'use strict';

var express    = require('express');
var http       = require('http');
var logger     = require('morgan');
var Path       = require('path');

var GameServer = require('./game/gameServer');
var statik = require('statik');
statik(process.env.PORT || 1337);

exports.startServer = function startServer(port, path, callback) {

    var app = express();

    var httpServer = http.createServer(app);
    var io = require('socket.io')(httpServer);
    var gameServer = GameServer(io);
    app.set('port', (process.env.PORT || port));
    app.use(express.static(Path.join(__dirname + "/../" + path)));
    //app.use(express.static(__dirname + '/public'));
    app.use(logger('dev'));

    app.get('/', function(req, res){
        res.sendFile('index.html');
    });

    gameServer.start();
    httpServer.listen(app.get('port'), callback);
};
