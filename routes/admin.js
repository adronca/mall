const route = require('express').Router();
const Admin = require('../models/admin'); 
const bcrypt = require('bcrypt');

route.get('/login', (req, res) => {
  res.render('admin')
})

route.post('/', async (req, res) => {
  const saltRounds = 12;
  currentPassword = await bcrypt.hash(req.body.password, saltRounds)

  let user = new Admin({
    login: req.body.login,
    password: currentPassword
  })

  await user.save();
  res.json(user);
})

route.post('/login', async (req, res) => {
  const user = await Admin.findOne({ login: req.body.login });
  if(!user) return res.status(400).send('email or password is wrong');

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if(!validPass) {
    return res.status(400).send('email or password is wrong');
  } else {
    return res.send('log in')
  }
})

module.exports = route