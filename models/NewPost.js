const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise

const postSchema = new Schema({
   userID: { 
      type: String
   },
   postTitle: {
      type: String,
      unique: true,
      required: true
   },
   postBody: {
      type: String,
      required: true
   },
   comments: {
      type: []
   },
   date: {
      type: Date,
      default: Date.now
   }
});

const NewPost = mongoose.model("NewPost", postSchema);
module.exports = NewPost;
