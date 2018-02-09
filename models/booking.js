const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create a company schema
const bookingSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    time: Number,
    userId: String,
    serviceId: String,
    serviceName: String
})

const Booking = mongoose.model('booking', bookingSchema)

module.exports = Booking