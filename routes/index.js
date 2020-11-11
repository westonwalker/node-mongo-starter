const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const homeController = require('../controllers/homeController')
const { catchErrors } = require('../handlers/errorHandlers')

// home
router.get('/', homeController.homePage)

// user
router.get('/account', authController.isLoggedIn, userController.account)
router.get('/login', userController.loginForm)
router.get('/register', userController.registerForm)
router.post('/register', 
  userController.validateRegister, 
  userController.register,
  authController.login
)

// auth
router.post('/login',  authController.login)
router.get('/logout', authController.logout)
router.post('/account-email', catchErrors(userController.updateAccountEmail), authController.login)
router.post('/account-password', userController.updateAccountPassword)

module.exports = router;
