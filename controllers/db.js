
const Company = require('../models/company')
const User = require('../models/user')
const Service = require('../models/service')
const Booking = require('../models/booking')


module.exports = {
    getCompany: async (req, res, next) => {
        const userId = req.query.userId
        let answer
        if(userId){
            answer = await Company.findOne({userId})
        } 
        if(!answer){
          return  res.status(400).json('Invalid query! Your request could not be performed! Please use `userId` to find a company')
        }
        res.status(200).json(answer)
    },

    getServices: async (req, res, next) => {
        const answer = await Service.find()
        res.status(200).json(answer)
    },

    getBookings: async (req, res, next) => {
        const answer = await Booking.find()
        res.status(200).json(answer)
    },

    createService: async (req, res, next) => {
        const newService = new Service(req.body)
        await newService.save()
        res.status(200).send("service successfuly saved to database")
    },

    createBooking: async (req, res, next) => {
        res.json({ msg: "You want to create a booking!" })
    },

    editCompany: async (req, res, next) => {
        const userId = req.user.id
        let company = await Company.findOne({userId})

        company.name = req.body.name
        company.description = req.body.description
        company.workingHours = req.body.workingHours
        company.workingDays = req.body.workingDays

        await company.save()

        res.status(200).send("success")
    },

    editService: async (req, res, next) => {
        res.json({ msg: "You want to edit a service!" })
    }

}
