const db = require("../models");
// const router = require("express").Router();
// const express = require("express");
// const passport = require("../passport");


module.exports = {
   // gets all Notes and orders by date and then comment amount.
   // For future we can limit to top 50 results or something
   getTrending: function (req, res) {
      db.NewPost
         .find(req.query)
         .limit(50)
         .sort({ date: -1, comments: -1 })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },
   post: function (req, res) {
      console.log(req.body)
      console.log(req.params.id)

      db.NewPost.create(req.body)
         .then(function (dbReview) {
            console.log(dbReview._id)
            // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. 
            // Update the Product to be associated with the new Review
            // { new: true } tells the query that we want it to return the updated Product -- 
            // it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which 
            // receives the result of the query
            return db.User.findOneAndUpdate(
               { username: req.params.id },
               { $push: { createdPosts: dbReview._id } },
               { new: true }
            );
         })
         .then(function (dbProduct) {
            console.log(dbProduct)
            // If we were able to successfully update a Product, send it back to the client
            res.json(dbProduct);
         })
         // db.NewPost.create(req.body)
         //    .then(function (savedNote) {
         //       return User.findOneAndUpdate(
         //          { _id: req.params.id },
         //          { $push: { createPosts: savedNote._id } },
         //          { new: true }
         //       );
         //    })
         //    .then((newPost) => {
         //       res.json(newPost);
         //    })
         .catch((err) => {
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
