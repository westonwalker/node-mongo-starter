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

// exports.verifyLicense = async (req, res) => {
//   try {
//     const result = await axios.post('https://api.gumroad.com/v2/licenses/verify', {
//       product_permalink: 'GVaFo',
//       license_key: req.params.license,
//       increment_uses_count: 'false',
//     })
//     console.log(result.data)
//     res.json(result.data)
//   } catch (err) {
//     res.send('Could not verify license: ' + err)
//   }
// }

exports.registerForm = async (req, res) => {
  res.render('pages/register', {
    title: 'Register'
  })
}

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    license: req.params.license,
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
