const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

require('dotenv').config();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }))

const loginRoute = require('./routes/admin');
const imageRoute = require('./routes/home');

app.use('/user/admin/', loginRoute);
app.use('/user', imageRoute);

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    //model
  const homeImage = require('./models/homeImages')
  const newImage = require('./models/boardImages')
  const Brands = require('./models/brands')
  const images = await homeImage.find();
  const newImages = await newImage.find();
  const brands = await Brands.find();
  res.render('home', { images: images, newImages: newImages, brands: brands });
})

app.get('/image', (req, res) => {
  res.render('uploadImage');
})

app.get('/news', (req, res) => {
  res.render('newImages');
})

async function start() {
  try {
    await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, { useUnifiedTopology: true }, console.log('DB START...'))
    app.listen(3000, _ => console.log('Server START...'));
  }
  catch(err) {
    console.log(err)
  }
}

start();

/* "login": "admin&%#1",
"password": "6566ty68" */