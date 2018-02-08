const jwt = require('jsonwebtoken');

const User = require('../models/user')
const Company = require('../models/company')
const { jwtSecret } = require('../config')

signToken = user => {
	return jwt.sign({
		iss: 'AuthAPI',
		sub: user.id,
		iat: new Date().getTime(),
		exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
	}, jwtSecret)
}

module.exports = {
	signUp: async (req, res, next) => {
		const { name, email, password } = req.value.body

		// Check if there is a user with same email
		const foundUser = await User.findOne({ email })

		if (foundUser) {
			return res.status(403).json("Email is already in use!")
		}

		// create a new user
		const newUser = new User({ email, password })
		await newUser.save()

		const newCompany = new Company({
			name,
			userId: newUser.id,
			description: '',
			logo: '../Public/assets/logo.png',
			workingHours: {
				start: 0,
				end: 23
			},
			workingDays: {
				0: true,
				1: true,
				2: true,
				3: true,
				4: true,
				5: true,
				6: true
			}
		})
		await newCompany.save();
		

		// respond with success
		res.status(200).json("User successfuly created!")
	},

	signIn: async (req, res, next) => {
		// Generate token
		const token = signToken(req.user)
		const uid = req.user.id

		res.status(200).json({ token, uid })
	},

	whoAmI: async (req, res, next) => {
		res.status(200).json({id: req.user.id, email: req.user.email})
	}

}
