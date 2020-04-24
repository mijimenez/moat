const router = require("express").Router();
const credentialsController = require("../../controllers/userController")
const passport = require("../../passport");


// from server you can follow the path to see how the route path gets it's name
// server -> routes/index -> routes/api/index -> routes/api/user-route

// actual route is api/user/signup
router.route("/signup")
   .post(credentialsController.signUp)

//actual route is api/user
router.route("/")
   .get(credentialsController.allUsers)

//actual route is api/user/
router.route("/:id")
   .get(credentialsController.findUser)
   .put(credentialsController.updateUser)

// actual route is api/user/cat/":id"
router.route("/cat/:id")
   .get(credentialsController.getUserCategories)
   .post(credentialsController.updateUserCategories)
   .delete(credentialsController.removeUserCategory)

// // Login route
// --- (You can send user id to front end here if you want, but Express is already keeping track of user through serialize/deserialize so no need to pass user id)
router.post(
   '/login',
   passport.authenticate('local'),
   (req, res) => {
      console.log('logged in', req.user);
      var userInfo = {
         username: req.user.username,
         profilePicture: req.user.profilePicture,
         categoryPreferences: req.user.categoryPreferences
      };
      res.send(userInfo);
   }
)

// // Logout route
router.post('/logout', (req, res) => {
   if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
   } else {
      res.send({ msg: 'no user to log out' })
   }
})

// Update user information
router.post('/updatePhoto', credentialsController.uploadPhoto)

module.exports = router;