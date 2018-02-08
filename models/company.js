const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create a company schema
const companySchema = new Schema({
    name: String,
    userId: String,
    description: String,
    logo: String,
    workingHours: Object,
    workingDays: Object
})

const Company = mongoose.model('company', companySchema)

module.exports = Company