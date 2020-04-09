const mongoose = require("mongoose");
const db = require("../models/user");


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
  }
];

db
  .deleteMany({})
  .then(() => db.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
