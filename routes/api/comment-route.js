const router = require("express").Router();
const commentController = require("../../controllers/commentsController")


// from server you can follow the path to see how the route path gets it's name
// server -> routes/index -> routes/api/index -> routes/api/post-route

// api/post
router.route("/")
   .post(commentController.post)
   .get(commentController.getTrending)

module.exports = router;
