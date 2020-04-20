const db = require("../models");



// Defining methods for the booksController
module.exports = {

   // find all users
   allUsers: function (req,res) {
      console.log(req.body)
      db.User
      .find()
      .sort({_id: -1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
   },

   // find a single user by username
   findUser: function (req, res) {
      const username = req.params.id
      console.log(username)
      db.User
      .findOne({username: username})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
   },

   // sign up using the passport validation and password hashing
   signUp: function (req, res) {
      console.log(req.body)
      const { username, password, email, firstName, lastName } = req.body
      // ADD VALIDATION
      db.User.findOne({ username: username }, (err, user) => {
         if (err) {
            console.log('User.js post error: ', err)
         } else if (user) {
            res.json({
               error: `Sorry, already a user with the username: ${username}`
            })
         }
         else {
            db.User.create({
               username: username,
               password: password,
               email: email,
               firstName: firstName,
               lastName: lastName
            }).then((savedUser) => {
               res.json(savedUser)
            }).catch((err) => {
               res.json(err)
            })
         }
      })
   }
};
