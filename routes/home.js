const route = require('express').Router();
const multer = require('multer');
const Image = require('../models/homeImages')
const newImage = require('../models/boardImages')

const storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './public/img');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});

const newImageStorage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './public/img/new');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});

const upload = multer({ storage: storage }).single("demo_image");
const uploadNewImages = multer({ storage: newImageStorage }).single("demo_image");

route.get('/', async (req, res) => {
  res.render('home');
})

route.post("/image", (req, res) => {
   upload(req, res, (err) => {
    if(err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
    let image = new Image({
      path: req.file.originalname
    })

    image.save();
 });
});

route.post("/newImage", (req, res) => {
  uploadNewImages(req, res, (err) => {
   if(err) {
     res.status(400).send("Something went wrong!");
   }
   res.send(req.file);
   let image = new newImage({
     path: req.file.originalname,
     year: req.body.year
   })

   image.save();
});
});

module.exports = route;