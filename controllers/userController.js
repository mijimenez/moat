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

   updateUserCategories: function (req, res) {
      console.log("body " + req.body.categoryPreferences)
      console.log(req.body.username)

      db.User.findOneAndUpdate(
         {
            username: req.body.username
         },
         {
            $addToSet: {
               categoryPreferences: req.body.categoryPreferences
            }
         },
         {
            useFindAndModify: false
         })
         .then((newCategory) => {
            console.log(newCategory)
            res.json(newCategory)
         })
   },

   removeUserCategory: function (req, res) {
      const category = req.body.categoryPreferences
      console.log(req.body)
      console.log(req.body.username)
      console.log("remove category " + category)
      db.User.findOneAndUpdate(
         {
            username: req.body.username
         }
         ,
         {
            $pull: {
               categoryPreferences: category
            }
         },
         {
            useFindAndModify: false
         })
         .then((newCategory) => {
            console.log("remove res " + newCategory.categoryPreferences)
            res.json(newCategory)
         })
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
            username: req.params.id
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
         console.log("post update " + savedUser.username)
         console.log("post update " + req.body.username)
         return db.NewPost.updateMany(
            {
               username: savedUser.username
            },
            {
               username: req.body.username
            }
         )
            .then(test => {
               console.log(test)
               return db.NewComment.updateMany(
                  {
                     username: savedUser.username
                  },
                  {
                     username: req.body.username
                  }
               )
            })


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
      console.log("upload req " + req.user._id);
      const id = req.user._id
      console.log(id)

      var form = new formidable.IncomingForm();
      // Deployed in production is expecting to look at build folder. If not production : Dev is looking at public folder
      form.uploadDir = process.env.NODE_ENV === "production" ? "./client/build/uploaded" : "./client/public/uploaded"; // set my directory where to save uploaded files
      
      form.keepExtensions = true;
      
      form.parse(req, function (err, fields, files) {
         console.log(files);
         console.log(`\n File Name Uploaded: ${files.filetoupload.name}\n-------------------------
         \nFile Name In Uploaded Directory: \n${files.filetoupload.path.replace(/\\/gi, "/")}\n--------------------------`);
         const newPicture = files.filetoupload.path.replace(/\\/gi, "/")
         console.log(newPicture)

         if (id === "") {
            return
         }
         else {
         console.log("upload1 " + id);
         db.User
            .findByIdAndUpdate(
               {
                  _id: id
               },
               {
                  $set:
                  {
                     profilePicture: newPicture
                  }
               },
               { new: true })
            .then(dbModel => {
               res.json(dbModel);
               console.log("upload 2" + dbModel)

               return db.NewPost.updateMany(
                  {
                     username: dbModel.username
                  },
                  {
                     profilePicture: newPicture
                  }
               )
                  .then(test => {
                     console.log("upload3" + test)
                     return db.NewComment.updateMany(
                        {
                           username: dbModel.username
                        },
                        {
                           profilePicture: newPicture
                        }
                     )
                  })
            })
            .catch(err => {
               res.status(422).json(err)
            });
         }
      });
   }
};
