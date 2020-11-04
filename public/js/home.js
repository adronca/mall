const express = require('express'),
  app = express(),
  mongoose = require('mongoose');

const Brands = require('./models/brands')
const brands = Brands.find();
console.log(brands)