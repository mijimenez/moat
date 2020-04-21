const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise

const commentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    postID: {
        type: String,
        required: true
    },
    commentBody: {
        type: String,
        required: true
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: "NewReplies"
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const NewComment = mongoose.model("NewComment", commentSchema);
module.exports = NewComment;
