/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Peer = require('./peer.model');

exports.register = function(socket) {
  Peer.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Peer.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('peer:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('peer:remove', doc);
}