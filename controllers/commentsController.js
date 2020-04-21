const db = require("../models");
const router = require("express").Router();
const express = require("express");
const passport = require("../passport");


module.exports = {
   // gets all Notes and orders by date and then comment amount.
   // For future we can limit to top 50 results or something
   getAllComments: function (req, res) {
      db.NewPost
         .find(req.query)
         .limit(50)
         .sort({ date: -1, comments: -1 })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },

   // create a new comment on a post
   createComment: function (req, res) {

      var comment = {
         username: req.body.username,
         profilePicture: req.body.profilePicture,
         commentBody: req.body.commentBody,
         date: new Date()
      }
      console.log(comment)

      db.NewComment.create(req.body)
         .then(function (newComment) {
            console.log("Test " + newComment._id)

            res.json(newComment)
            return db.NewPost.findOneAndUpdate(
               { _id: req.params.id },
               {
                  $push: {
                     commentsArray: {
                        commentId: newComment._id,
                        comment: comment
                     },
                  }
               },
               { new: true, useFindAndModify: false }
            );
         })
         .catch((err) => {
            res.json(err)
         })
   },

   findCommentByPost: function (req,res) {
      console.log(req.params)

      db.NewPost.find({commentId: req.params.id})
      .then(comment => {
         console.log(comment)
      })
   },


   removeComment: function (req, res) {
      console.log(req.params.id)

      db.NewComment
         .deleteOne({ _id: req.params.id })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   }
};
