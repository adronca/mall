const { Schema, model } = require('mongoose');

const homeImageSchema = new Schema({
  path: String,
  name: String,
  boadrd: Boolean,
  price: Number,
  year: String,
  gender: String,
  category: String,
  parametres: Map
})

module.exports = model('news', homeImageSchema);