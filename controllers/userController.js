const db = require("../models");
const formidable = require('formidable');
const bcrypt = require("bcryptjs");



// Defining methods for the booksController
module.exports = {

   // find all users
   allUsers: function (req, res) {
      console.log(req.body)
      db.User
         .find()
         .sort({ _id: -1 })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },

   getUserCategories: function (req, res) {
      console.log(req.body)

      db.User
         .findOne({ username: req.params.id })
         .sort()
         .then(userCat => {
            res.json(userCat.categoryPreferences)
         });
   },

   // find a single user by username
   findUser: function (req, res) {
      const username = req.params.id
      console.log(username)
      db.User
         .findOne({ username: username })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },

   updateUser: function (req, res) {

      const hashedPassword = bcrypt.hashSync(req.body.password, 10)
      console.log(hashedPassword)
      console.log(req.params.id)
      // var password = req.body.password
      const { username, email, firstName, lastName } = req.body

      db.User.findOneAndUpdate(
         {
            _id: req.params.id
         },
         {
            username: username,
            password: hashedPassword,
            email: email,
            firstName: firstName,
            lastName: lastName
         },
         {
            useFindAndModify: false
         }
      ).then((savedUser) => {

         res.json(savedUser)
         // db.NewPost.updateMany(
         //    {
         //       username: savedUser.username
         //    },
         //    {
         //       username: req.body.username
         //    }
         // )
      }).catch((err) => {
         res.json(err)
      })

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
   },

   uploadPhoto: function (req, res) {
      console.log("Received profile pic image");
      console.log(req.body);
      var form = new formidable.IncomingForm();
      form.uploadDir = "./"; // set my directory where to save uploaded files
      form.keepExtensions = true;
      form.parse(req, function (err, fields, files) {
         console.log(`File Name Uploaded: ${files.filetoupload.name}
         File Name In Uploaded Directory: ${files.filetoupload.path}`);

         // Here we can save path of file to a database.

         res.write('File uploaded');
         res.end();
      });
   }
};
