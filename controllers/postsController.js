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
         .sort({ commentsArray: -1, date: -1 })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },

   // creates a post and adds to user's document
   createPost: function (req, res) {
      console.log(req.body)
      console.log(req.params)

      const userId = req.params.id
      console.log(userId)

      db.NewPost.create(req.body)
         .then(function (newPost) {
            console.log(newPost._id)

            res.json(newPost)
            return db.User.findOneAndUpdate(

               { username : userId },
               {
                  $push: {
                     createdPosts: newPost._id
                  }
               },
               { new: true, useFindAndModify: false }
            );
         })
   },

   // gets a specific post 
   getUserPost: function (req, res) {
      console.log(req.params)

      return db.NewPost.findOne({ _id: req.params.id })
         .populate('commentsArray').exec((err, commentsArray) => {
            console.log(commentsArray)
            if(err) {
               res.status(422).json(err)
            }
            res.json(commentsArray)
         })
   },

   // finds all the posts by a single user
   getAllUserPosts: function (req, res) {
      console.log("userID " + req.params.id)

      db.NewPost.find({ username: req.params.id })
         .sort({ date: -1})
         .then(allPosts => {
            console.log(allPosts);
            res.json(allPosts)
         })
         .catch((err) => res.status(422).json(err));
   },


   //
   getAllUserCategories: function (req, res) {
      console.log(req.params);

      db.NewPost.find({ username: req.params.name, categories: req.params.category })
   },

   // getting a post by specific categories
   getPostByCategories: function (req, res) {
      console.log(req.params)
      db.NewPost.find({ categories: req.params.category || /req.params/i})
      .then(postCategory => {
         console.log(postCategory)
         res.json(postCategory)
      })
      .catch(err => {
         res.status(422).json(err)
      })
   },
   
   //
   removePost: function (req, res) {
      console.log(req.params.id)

      db.NewPost
         .deleteOne({ _id: req.params.id })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   }
};
