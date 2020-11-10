const mongoose = require('mongoose')
const axios = require('axios')
const User = mongoose.model('User')
const promisify = require('es6-promisify')

exports.loginForm = (req, res) => {
  // If already logged in
  if (req.isAuthenticated()) {
    req.flash('success', 'You are already logged in!')
    res.redirect('/')
    return
  }
  res.render('pages/login', {
    title: 'Login',
  })
}

exports.updateAccountEmail = async (req, res) => {
  const updates = {
    email: req.body.email,
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  )

  res.redirect('/account')
}

// TODO
exports.updateAccountPassword = async (req, res) => {
  res.redirect('/account')
}

exports.registerForm = async (req, res) => {
  res.render('pages/register', {
    title: 'Register'
  })
}

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email
  })
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  next()
}

exports.account = async (req, res) => {
  res.render('pages/account', { title: 'Account Details' })
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  })
  req.checkBody('email', 'You must supply a email!').notEmpty()
  req.checkBody('password', 'You must supply a password!').notEmpty()

  const errors = req.validationErrors()
  if (errors) {
    req.flash('error', errors.map(err => err.msg))
    res.render(`pages/register`, { title: 'Register', body: req.body, flashes: req.flash() })
    return
  }
  next()
}
