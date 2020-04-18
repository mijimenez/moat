const router = require("express").Router();
const express = require("express");
const apiController = require("../../controllers/postsController")


// from server you can follow the path to see how the route path gets it's name
// server -> routes/index -> routes/api/index -> routes/api/post-route

// api/post
router.route("/")
   .get(apiController.getTrending)

router.route("/:id")
   .post(apiController.post)
   // .get(apiController.allPosts)

module.exports = router;
