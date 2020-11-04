const { Schema, model } = require('mongoose');

const brandsSchema = new Schema({
  name: String,
  path: String
})

module.exports = model('brands', brandsSchema);