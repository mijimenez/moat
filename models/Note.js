const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise

const NoteSchema = new Schema({
  title: {
     String
  },
  text: {
     String
  }
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
