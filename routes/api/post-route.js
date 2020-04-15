const router = require("express").Router();
const express = require("express");
const app = express();
const userModel = require("../../models/user");
const Note = require("../../models/Note");

// api/post/testers
router.post("/testers", (req, res) => {
   console.log(req.body)
   const { title, text } = req.body
   Note.create({
      title: "test",
      text: "test"
   }).then((savedUser) => {
      res.json(savedUser)
   }).catch((err) => {
      res.json(err)
   })
});

module.exports = router;
