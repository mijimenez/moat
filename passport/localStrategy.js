const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // DEFAULT, (Use whatever field in our model used to identify user e.g 'email')
	},
	function(username, password, done) {
		User.findOne({ username: username }, (err, user) => {
			
			if (err) {return done(err)}
			
			if (!user) {return done(null, false, { message: 'Incorrect username' })}
			
			if (!user.checkPassword(password)) {return done(null, false, { message: 'Incorrect password' })}

			// The second argument in 'done()' becomes the 'user' parameter in passport.serializeUser
			return done(null, user);
		})
	}
)

module.exports = strategy
