const router = require("express").Router();
const express = require("express");
const apiController = require("../../controllers/postsController")

// api/post
router.route("/")
   .post(apiController.note)

module.exports = router;
