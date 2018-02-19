
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
        company.logo = req.body.logo
        company.description = req.body.description
        company.workingHours = req.body.workingHours
        company.workingDays = req.body.workingDays

        await company.save()

        res.status(200).send("success")
    },

    getCompany: async (req, res, next) => {
        let answer
        if (req.params.id) {
            answer = await Company.findOne({ userId: req.params.id })
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

    getService: async (req, res, next) => {
        const service = await Service.findOne({ _id: req.params.id })
        return res.status(200).json(service)
    },

    getAllServices: async (req, res, next) => {
        const services = await Service.find()
        let answer = []
        let company
        for(let i = 0; i < services.length; i++) {
            company = await Company.findOne({ userId: services[i].userId })
            let service = services[i].toObject()
            service.logo = company.logo
            service.company = company.name
            service.available = company.workingHours.start + ':00 - ' + company.workingHours.end + ':00'
            answer.push(service)
        }
        res.status(200).json(answer)
    },

    getCompanyServices: async (req, res, next) => {
        const services = await Service.find({ userId: req.params.id })
        let company
        let answer = []
        for(let i = 0; i < services.length; i++) {
            company = await Company.findOne({ userId: services[i].userId })
            let service = services[i].toObject()
            service.available = company.workingHours.start + ':00 - ' + company.workingHours.end + ':00'
            answer.push(service)
        }
        return res.status(200).json(answer)
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
    },

    deleteService: async (req, res, next) => {
        const id = req.params.id
        const bookings = await Booking.find({ serviceId: id })
        for(let i=0;i<bookings.length;i++){
            const removed = await Booking.findByIdAndRemove(bookings[i]._id)
        }
        const service = await Service.findByIdAndRemove(id)
        res.status(200).send("service successfuly removed. all bookings associated to this services are removed too")
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
        let answer = []
        const bookings = await Booking.find({ userId: id }).sort('time')
        for (let i = 0; i < bookings.length; i++) {
            let booking = bookings[i].toObject()
            const service = await Service.findOne({_id: booking.serviceId})
            booking.serviceName = service.name
            answer.push(booking)
        }

        res.status(200).json(answer)
    }

}
