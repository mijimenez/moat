const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../models/User')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
// keeps them logged in in Passport
passport.serializeUser((user, done) => {
	// console.log('*** serializeUser called, user: ')
	// console.log(user) // the whole raw user object!
	// console.log('---------')
	// The second argument in 'done()' below is the object that is saved to req.session.pasport.user
	// Which then gets passed to deserializeUser below as it's 'user' parameter.
	done(null, { "_id": user._id, "username": user.username })
})

// user object attaches to the request as req.user = { "_id": user._id, "username": user.username }
// keeps them logged in in express
passport.deserializeUser((user, done) => {
	// console.log('DeserializeUser called')
	// User.findOne(
	// 	{ _id: id },
	// 	'username',
	// 	(err, user) => {
	// 		console.log('*** Deserialize user, user:')
	// 		console.log(user)
	// 		console.log('--------------')
	// 		done(null, user)
	// 	}
	// )
	// The second argument in 'done()' below is the object that is saved to req.user
	done(null, user)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport
