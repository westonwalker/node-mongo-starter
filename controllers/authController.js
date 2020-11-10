const passport = require('passport')

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Email or password was incorrect!',
  successRedirect: '/',
  successFlash: 'You are now logged in!',
})

exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'You are now logged out!')
  res.redirect('/')
}

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
    return
  }
  req.flash('error', 'Please login first!')
  res.redirect('/login')
}
