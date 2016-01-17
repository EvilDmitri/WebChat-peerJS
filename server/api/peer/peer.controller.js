'use strict';

var _ = require('lodash');
var Peer = require('./peer.model');

// Get list of peers
exports.index = function(req, res) {
  Peer.find(function (err, peers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(peers);
  });
};

// Get a single peer
exports.show = function(req, res) {
  Peer.findById(req.params.id, function (err, peer) {
    if(err) { return handleError(res, err); }
    if(!peer) { return res.status(404).send('Not Found'); }
    return res.json(peer);
  });
};

// Creates a new peer in the DB.
exports.create = function(req, res) {
  Peer.create(req.body, function(err, peer) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(peer);
  });
};

// Updates an existing peer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Peer.findById(req.params.id, function (err, peer) {
    if (err) { return handleError(res, err); }
    if(!peer) { return res.status(404).send('Not Found'); }
    var updated = _.merge(peer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(peer);
    });
  });
};

// Deletes a peer from the DB.
exports.destroy = function(req, res) {
  Peer.findById(req.params.id, function (err, peer) {
    if(err) { return handleError(res, err); }
    if(!peer) { return res.status(404).send('Not Found'); }
    peer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}