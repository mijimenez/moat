const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise

const postSchema = new Schema({
   username: {
      type: String
   },
   profilePicture: {
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
   postImage: {

   },
   categories: [],
   comments: [],
   date: {
      type: Date,
      default: Date.now
   }
});

const NewPost = mongoose.model("NewPost", postSchema);
module.exports = NewPost;
