let passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy

const { jwtSecret } = require('./config')
const User = require('./models/user')

//  JWT strategy
passport.use(new jwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: jwtSecret
}, async (payload, done) => {
	try {
		//Find the user specified in token
		const user = await User.findById(payload.sub)

		//If user doesn't exist, handle it
		if (!user) {
			return done(null, false)
		}

		//Otherwise, return user
		done(null, user)

	} catch (error) {
		done(error, false)
	}
}))


// Local Strategy
passport.use(new LocalStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	try {
		// Find the user given the email
		const user = await User.findOne({ email })

		// If not, handle it
		if (!user) {
			return done(null, false)
		}

		// Check if the password is correct
		const isMatch = await user.passwordIsValid(password)

		// If not, handle it
		if (!isMatch) {
			return done(null, false)
		}

		// Otherwise, return user
		done(null, user)
	} catch (error) {
		done(error, false)
	}

}))
