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
  // relog the user in with new email 
  await req.login(user) 
  req.flash('success', 'Email updated!')
  res.redirect('back')
}

exports.updateAccountPassword = async (req, res) => {
  const user = await User.findOne({
    _id: req.user._id
  })
  const currentPassword = req.body.current_password;
  const newPassword = req.body.new_password; 
  const changePassword = promisify(user.changePassword, user)

  try {
    await changePassword(currentPassword, newPassword)
    const setPassword = promisify(user.setPassword, user)
    await setPassword(newPassword)
    const updatedUser = await user.save()
    await req.login(updatedUser)
    req.flash('success', 'Password Updated!')
  } catch(err) { 
    if(err.name === 'IncorrectPasswordError'){ 
        req.flash('error', 'Incorrect password!')
    }else { 
        req.flash('error', 'Oops Something went wrong!!')
    }
  }
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
