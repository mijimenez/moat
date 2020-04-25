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

      console.log(req.body.postID)
      db.NewComment.create(req.body)
         .then(function (newComment) {
            console.log("Test " + newComment._id)

            res.json(newComment)
            return db.NewPost.findOneAndUpdate(

               { _id: req.params.id },
               {
                  $push: {
                     commentsArray: newComment._id
                  }
               },
               { new: true, useFindAndModify: false }
            );
         })
         .then(test => {
            console.log(test)
         })
         .catch((err) => {
            res.json(err)
         })
   },


   findCommentByPost: function (req, res) {
      console.log(req.params)

      return db.NewPost.findOne({ _id: req.params.id })
         .populate('commentsArray').exec((err, commentsArray) => {
            console.log(commentsArray)
            res.json(commentsArray)
         })
   },


   removeComment: function (req, res) {
      
      console.log(req.params.id)

      db.NewComment.findOneAndDelete({ _id: req.params.id })
         .then((deletedDocument) => {
            
            res.json(deletedDocument)
            console.log("test " + deletedDocument.postID)

            return db.NewPost.findOneAndUpdate(
               { _id: deletedDocument.postID },
               {
                  $pull: {
                     commentsArray: req.params.id
                  }
               },
               { useFindAndModify: false }
            )
            .then((test) => {
               console.log(test)
               // res.json(test);
            })
         })
   }
};
