'use strict';



var _ = require('lodash');
var Chat = require('./chat.model');

var clients = {};


exports.register = function(socket) {
    //socket.on('rooms', function() {
    //    socket.emit('rooms', io.sockets.manager.rooms);
    //});



    socket.on('connected', function (data) {
        console.info('[%s] %s', socket.request.connection.remoteAddress, JSON.stringify(data, null, 2));

        clients[data.id] = data.name;

        console.log(clients);
        socket.broadcast.emit('message', {
            data: clients
        });
    });

    socket.on('disconnected', function (data) {
        console.info('[%s] %s', socket.request.connection.remoteAddress, JSON.stringify(data, null, 2));

        delete clients[data.id];

        socket.broadcast.emit('message', {
            data: clients
        });
    });
};
