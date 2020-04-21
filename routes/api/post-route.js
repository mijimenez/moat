const router = require("express").Router();
const express = require("express");
const apiController = require("../../controllers/postsController")


// from server you can follow the path to see how the route path gets it's name
// server -> routes/index -> routes/api/index -> routes/api/post-route

// api/post
router.route("/")
   .get(apiController.getTrending)

router.route("/:id")
   .post(apiController.createPost)
   .get(apiController.getAllUserPosts)
   .delete(apiController.removePost)
   
// full route is api/post/1/"id"
router.route("/1/:id")
   .get(apiController.getUserPost)

router.route("/cat/:category")
   .get(apiController.getPostByCategories)

// route to get posts by user and category
// router.route("/1/category/:name/:category")

// route to view the home page by category
// router.route("/category/:name")

module.exports = router;
