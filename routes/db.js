const express = require('express')
const router = require('express-promise-router')()
const passport = require('passport')

const passportConfig = require('../passport')
const passportSignIn = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false })

const DBController = require('../controllers/db')

router.route('/companies')
    .get(DBController.getCompany)

router.route('/companies')
    .put(passportJWT, DBController.editCompany)

router.route('/services')
    .post(passportJWT, DBController.createService)

router.route('/services')
    .get(DBController.getServices)

router.route('/services')
    .put(DBController.editService)

router.route('/services')
    .delete(passportJWT, DBController.deleteService)

router.route('/bookings')
    .post(DBController.createBooking)

router.route('/bookings')
    .get(passportJWT, DBController.getBookings)

module.exports = router
