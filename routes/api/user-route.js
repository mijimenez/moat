const router = require("express").Router();
const express = require("express");
const app = express();
const apiController = require("../../controllers/apiController")
const passport = require("../../passport");


// api/user/signup

router.route("/")
   .get(apiController.signUp)
   .post(apiController.signUp)


// router.post("/signup", (req, res) => {
//    console.log(req.body)
//    console.log('user signup');
//    const { username, password, email } = req.body
//    // ADD VALIDATION
//    userModel.findOne({ username: username }, (err, user) => {
//       if (err) {
//          console.log('User.js post error: ', err)
//       } else if (user) {
//          res.json({
//             error: `Sorry, already a user with the username: ${username}`
//          })
//       }
//       else {
//          // New way to add new user document
//          // const newUser = new userModel({
//          //     username: username,
//          //     password: password
//          // })
//          // newUser.save((err, savedUser) => {
//          //     if (err) return res.json(err)
//          //     res.json(savedUser)
//          // })
//          // Standard way to add new user document
//          userModel.create({
//             username: username,
//             password: password,
//             email: email
//          }).then((savedUser) => {
//             res.json(savedUser)
//          }).catch((err) => {
//             res.json(err)
//          })
//       }
//    })
// });


// // Login route
// // --- (You can send user id to front end here if you want, but Express is already keeping track of user through serialize/deserialize so no need to pass user id)
// router.post(
//    '/login',
//    passport.authenticate('local'),
//    (req, res) => {
//       console.log('logged in', req.user);
//       var userInfo = {
//          username: req.user.username
//       };
//       res.send(userInfo);
//    }
// )

// // Logout route
// router.post('/logout', (req, res) => {
//    if (req.user) {
//       req.logout()
//       res.send({ msg: 'logging out' })
//    } else {
//       res.send({ msg: 'no user to log out' })
//    }
// })

module.exports = router;