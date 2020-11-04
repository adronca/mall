const { Schema, model } = require('mongoose');

const homeImageSchema = new Schema({
  path: String
})

module.exports = model('homeMainImages', homeImageSchema);