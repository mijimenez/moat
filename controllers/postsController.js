const db = require("../models");

module.exports = {
   // gets all Notes and orders by date and then comment amount.
   getTrending: function (req, res) {
      db.NewPost
         .aggregate(
            [
               {
                  $project: {
                     username: 1,
                     profilePicture: 1,
                     postTitle: 1,
                     postImage: 1,
                     categories: 1,
                     commentsArray: 1,
                     prettyDate: 1,
                     trendingDate: 1,
                     length: { "$size": "$commentsArray" }
                  }
               },
               { $sort: { trendingDate: -1, length: -1 } },
               { $limit: 50 }
            ]
         )
         .then(dbModel => {
            res.json(dbModel)
         })
         .catch(err => res.status(422).json(err));
   },

   // creates a post and adds to user's document
   createPost: function (req, res) {

      var d = new Date();
      const time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      var seconds = d.getSeconds();
      var minute = ((d.getMinutes() < 10 ? '0' : '') + d.getMinutes()); // if minutes less than 10 add a 0 in front
      var hour = d.getHours();
      var date = d.getDate();
      var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
      var year = d.getFullYear();

      const customDate = "" + year + month + date + hour;
      const prettyDate = month + "/" + date + "/" + year + "  " + time
      const preciseDate = "" + year + month + date + hour + minute + seconds;

      db.NewPost.create(
         {
            username: req.body.username,
            postTitle: req.body.postTitle,
            postBody: req.body.postBody,
            profilePicture: req.body.profilePicture,
            categories: req.body.categories,
            prettyDate: prettyDate,
            trendingDate: customDate,
            preciseDate: preciseDate
         }
      )
         .then(function (newPost) {

            res.json(newPost)
            return db.User.findOneAndUpdate(

               { username: req.body.username },
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

      return db.NewPost.findOne({ username: req.params.id })
         .populate('commentsArray').exec((err, commentsArray) => {

            res.json(commentsArray)
         })
   },

   // finds all the posts by a single user
   getAllUserPosts: function (req, res) {

      db.NewPost.find({ username: req.params.id })
         .sort({ preciseDate: -1 })
         .then(allPosts => {
            res.json(allPosts)
         })
         .catch((err) => res.status(422).json(err));
   },

   // getting a post by specific categories
   getPostByCategories: function (req, res) {

      db.NewPost.aggregate(
         [
            {
               $match: {
                  categories: req.params.category
               }
            },
            {
               $project: {
                  username: 1,
                  profilePicture: 1,
                  postTitle: 1,
                  postImage: 1,
                  categories: 1,
                  commentsArray: 1,
                  prettyDate: 1,
                  trendingDate: 1,
                  length: { "$size": "$commentsArray" }
               }
            },
            { $sort: { trendingDate: -1, length: -1 } },
            { $limit: 50 }
         ]
      )
         .limit(50)
         .then(postCategory => {

            res.json(postCategory)
         })
         .catch(err => {
            res.status(422).json(err)
         })
   },

   updatePost: function (req,res) {

      console.log("update post " + req)

      db.User.findOneAndUpdate(
         {
            _id: req.body.id
         }
      )
   },

   // removes a post
   removePost: function (req, res) {

      db.NewPost
         .deleteOne({ _id: req.params.id })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   }
};
