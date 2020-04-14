const router = require("express").Router();
const express = require("express");
const app = express();
const userModel = require("../../models/user");
const Note = require("../../models/Note");

// test
router.post("/testers", ({body}, res) => {
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
