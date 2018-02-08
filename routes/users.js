const express = require('express')
const router = require('express-promise-router')()
const passport = require('passport')

const passportConfig = require('../passport')
const passportSignIn = passport.authenticate('local', {session: false})
const passportJWT = passport.authenticate('jwt', {session: false})

const {validateBody, schemas} = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users')

router.route('/signup')
	.post(validateBody(schemas.authSchema),  UsersController.signUp)

router.route('/signin')
	.post(validateBody(schemas.loginSchema), passportSignIn, UsersController.signIn)

router.route('/me')
	.get(passportJWT,  UsersController.whoAmI)

module.exports = router
