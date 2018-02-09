
const Company = require('../models/company')
const User = require('../models/user')
const Service = require('../models/service')
const Booking = require('../models/booking')


module.exports = {
    editCompany: async (req, res, next) => {
        const userId = req.user.id
        let company = await Company.findOne({ userId })
        if (!company) {
            return res.status(403)
        }

        company.name = req.body.name
        company.description = req.body.description
        company.workingHours = req.body.workingHours
        company.workingDays = req.body.workingDays

        await company.save()

        res.status(200).send("success")
    },

    getCompany: async (req, res, next) => {
        let answer
        if (req.query.userId) {
            answer = await Company.findOne({ userId: req.query.userId })
        }
        if (!answer) {
            return res.status(403).send('Invalid query! Your request could not be performed!')
        }
        res.status(200).json(answer)
    },



    createService: async (req, res, next) => {
        const newService = new Service(req.body)
        const saved = await newService.save()
        if (saved) {
            res.status(200).send("service successfuly saved to database")
        } else {
            res.status(500).send("internal server error, please try again")
        }
    },

    getServices: async (req, res, next) => {
        if (req.query.id) {
            const answer = await Service.findOne({ _id: req.query.id })
            if (answer) {
                return res.status(200).json(answer)
            }
        }
        if (req.query.userId) {
            const answer = await Service.find({ userId: req.query.userId })
            return res.status(200).json(answer)
        }
        const answer = await Service.find()
        res.status(200).json(answer)
    },

    editService: async (req, res, next) => {
        const serviceId = req.body._id
        let service = await Service.findOne({ _id: serviceId })

        if (!service) {
            return res.status(403).send('Service not found')
        }

        service.name = req.body.name
        service.description = req.body.description
        service.spaces = req.body.spaces
        service.price = req.body.price
        service.availability = req.body.availability
        service.duration = req.body.duration

        await service.save()

        res.status(200).send("success")
        res.json({ msg: "You want to edit a service!" })
    },

    deleteService: async (req, res, next) => {
        const service = await Service.findByIdAndRemove(req.query.id)
        if (!service) {
            res.status(500)
        } else {
            res.status(200).send("service successfuly removed. all bookings associated to this services are removed too")
        }
    },

    createBooking: async (req, res, next) => {
        const booking = new Booking(req.body)
        const saved = await booking.save();
        if (saved) {
            res.status(200).send("booking saved successfuly")
        } else {
            res.status(500).send("internal server error, please try again")
        }
    },

    getBookings: async (req, res, next) => {
        const id = req.user.id
        const answer = await Booking.find({ userId: id }).sort('time')
        res.status(200).json(answer)
    }

}
