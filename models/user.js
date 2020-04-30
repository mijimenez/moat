const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');


mongoose.promise = Promise
//"test"
// Define userSchema
const userSchema = new Schema({
   username: {
      type: String,
      unique: true,
      required: "Username is required"
   },
   password: {
      type: String,
      unique: false,
      required: "Password is Required",
      validate: [({ length }) => length >= 6, "Password should be longer."]
   },
   email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
   },
   firstName: {
      type: String
   },
   lastName: {
      type: String
   },
   profilePicture: {
      type: String,
      default: "../img/moat_logo_color.png"
   },
   categoryPreferences: {
      type: []
   },
   date: {
      type: Date,
      default: Date.now
   },
   createdPosts: [
      {
         type: Schema.Types.ObjectId,
         ref: "NewPost"
      }
   ]
})
// Define schema methods
userSchema.methods = {
   checkPassword: function (inputPassword) {
      return bcrypt.compareSync(inputPassword, this.password)
   },
   hashPassword: plainTextPassword => {
      return bcrypt.hashSync(plainTextPassword, 10)
   }
}
// Define hooks for pre-saving
userSchema.pre('save', function (next) {
   if (!this.password) {
      console.log('models/user.js =======NO PASSWORD PROVIDED=======')
      next()
   } else {
      console.log('models/user.js hashPassword in pre save');
      this.password = this.hashPassword(this.password)
      next()
   }
})
const User = mongoose.model('User', userSchema);
module.exports = User;