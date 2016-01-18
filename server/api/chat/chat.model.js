'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatSchema = new Schema({
  name: String,
  id: String,
  active: Boolean
});

module.exports = mongoose.model('Chat', ChatSchema);