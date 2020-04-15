const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise

const postSchema = new Schema({
  postTitle: {
     type: String,
     unique: true
  },
  postBody: {
     type: String
  },
  date: { 
     type: Date, 
     default: Date.now 
   }
});

const NewPost = mongoose.model("NewPost", postSchema);
module.exports = NewPost;
