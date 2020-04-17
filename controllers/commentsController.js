const db = require("../models");
const router = require("express").Router();
const express = require("express");
const passport = require("../passport");


module.exports = {
   // gets all Notes and orders by date and then comment amount.
   // For future we can limit to top 50 results or something
   getTrending: function (req, res) {
      db.NewPost
         .find(req.query)
         .limit(50)
         .sort({ date: -1, comments: -1})
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },
   post: function (req, res) {
      console.log(req.body)
      // const userID = req.body._id
      // const { _id: userID, username, password, email } = req.body
      db.NewPost.create(req.body)
      .then((savedNote) => {
         res.json(savedNote)
      }).catch((err) => {
         res.json(err)
      })
   },






   remove: function (req, res) {
      db.Book
         .deleteOne({ _id: req.params.id })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   }
};
