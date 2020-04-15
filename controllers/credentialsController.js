const db = require("../models");
const router = require("express").Router();
const express = require("express");


// Defining methods for the booksController
module.exports = {
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
   }
};
