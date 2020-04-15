const db = require("../models");
const router = require("express").Router();
const express = require("express");


// Defining methods for the booksController
module.exports = {
   findAll: function (req, res) {
      db.Book
         .find(req.query)
         .sort({ _id: -1 })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },
   signUp: function (req, res) {
      console.log(req.body)
      const { username, password, email } = req.body
      // ADD VALIDATION
      db.User.findOne({ username: username }, (err, user) => {
         if (err) {
            console.log('User.js post error: ', err)
         } else if (user) {
            res.json({
               error: `Sorry, already a user with the username: ${username}`
            })
         }
         else {
            db.User.create({
               username: username,
               password: password,
               email: email
            }).then((savedUser) => {
               res.json(savedUser)
            }).catch((err) => {
               res.json(err)
            })
         }
      })
   },
   remove: function (req, res) {
      db.Book
         .deleteOne({ _id: req.params.id })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   }
};
