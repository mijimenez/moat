const mongoose = require("mongoose");
const User = require("../models/user");


mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/moatDB"
);

const userSeed = [
  {
    username: "PolkaDotMask",
    password: "Testing_1",
    email: "test@gmail.com",
    userCreated: new Date(Date.now())
  },
  {
   username: "StaySixFeetAwayPlease",
   password: "Password_1",
   email: "test2@gmail.com",
   userCreated: new Date(Date.now())
 }
];

User
  .deleteMany({})
  .then(() => User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
