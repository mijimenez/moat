const router = require("express").Router();
const commentController = require("../../controllers/commentsController")


// from server you can follow the path to see how the route path gets it's name
// server -> routes/index -> routes/api/index -> routes/api/post-route

// api/comment
router.route("/")
   .get(commentController.getAllComments)
   // .get(commentController.getTrending)

// api/comment/"some kind of id"
router.route("/:id")
   .post(commentController.createComment)
   .delete(commentController.removeComment)
   .get(commentController.findCommentByPost)
   // create route to get all comments by a user for user profile



module.exports = router;
