const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create a company schema
const serviceSchema = new Schema({
    userId: String,
    name: String,
    description: String,
    spaces: Number,
    price: Number,
    availability: Object,
    duration: Object
})

const Service = mongoose.model('service', serviceSchema)

module.exports = Service