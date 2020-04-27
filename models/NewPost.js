const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;



const postSchema = new Schema({
   username: {
      type: String
   },
   profilePicture: {
      type: String
   },
   postTitle: {
      type: String,
      required: true
   },
   postBody: {
      type: String,
      required: true
   },
   postImage: {

   },
   categories: [],
   commentsArray: [
      {
         type: Schema.Types.ObjectId,
         ref: "NewComment"
      }
   ],
   prettyDate: {type: String},
   date: {type: String}
});

const NewPost = mongoose.model("NewPost", postSchema);
module.exports = NewPost;
