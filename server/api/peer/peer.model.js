'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PeerSchema = new Schema({
  name: String,
  id: String,
  active: Boolean
});

module.exports = mongoose.model('Peer', PeerSchema);
