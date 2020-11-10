const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const homeController = require('../controllers/homeController')
const purchaseController = require('../controllers/purchaseController')
const themeController = require('../controllers/themeController')
const { catchErrors } = require('../handlers/errorHandlers')

// router.get('/add', authController.isLoggedIn, storeController.addStore)
// router.get('/stores', catchErrors(storeController.getStores))
// router.post('/add',  catchErrors(storeController.createStore))
// router.get('/stores/:id/edit', catchErrors(storeController.editStore))
// router.post('/add/:id',  catchErrors(storeController.updateStore))

// home
router.get('/', homeController.homePage)

// purchase
router.get('/pricing', purchaseController.pricing)
router.post('/purchase',  purchaseController.purchase)
router.get('/verify/:license',  catchErrors(userController.verifyLicense))
router.get('/purchase-confirmation',  purchaseController.purchaseConfirmation)

// user
router.get('/login', userController.loginForm)
router.get('/register/:license', userController.registerForm)
router.post('/register/:license', 
  userController.validateRegister, 
  userController.register,
  authController.login
)

// auth
router.post('/login',  authController.login)
router.get('/logout', authController.logout)
router.get('/account', authController.isLoggedIn, userController.account)
router.post('/account-email', catchErrors(userController.updateAccountEmail))
router.post('/account-password', catchErrors(userController.updateAccountPassword))

// theme
router.get('/themes/:slug', themeController.show)

module.exports = router;