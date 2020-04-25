const mongoose = require("mongoose");
const User = require("../models/user");


mongoose.connect(
   process.env.MONGODB_URI ||
   "mongodb://localhost/moatDB"
);

const userSeed = [
   {
      profilePicture: "../img/NoImageFound.png",
      categoryPreferences: [],
      createdComments: [],
      username: "PolkaDotMask",
      firstName: "Brianna",
      lastName: "Morez",
      password: "$2a$10$AnAbaVkRtrG.c829veVge.v2gHPZqxW98HPcyxzO.7QFz80.n7tze",
      email: "test@gmail.com",
      date: new Date(Date.now()),
      createdPosts: []
   },
   {
      profilePicture: "../img/NoImageFound.png",
      categoryPreferences: [],
      createdComments: [],
      username: "StaySixFeetAwayPlease",
      password: "$2a$10$AnAbaVkRtrG.c829veVge.v2gHPZqxW98HPcyxzO.7QFz80.n7tze",
      firstName: "Fenix",
      lastName: "Ho",
      email: "test2@gmail.com",
      date: new Date(Date.now()),
      createdPosts: []
   },
   {
      profilePicture: "../img/NoImageFound.png",
      categoryPreferences: [],
      createdComments: [],
      username: "TestUser",
      password: "$2a$10$AnAbaVkRtrG.c829veVge.v2gHPZqxW98HPcyxzO.7QFz80.n7tze",
      firstName: "Test",
      lastName: "Tester",
      email: "test3@gmail.com",
      date: new Date(Date.now()),
      createdPosts: []
   },
   {
      profilePicture: "../img/NoImageFound.png",
      categoryPreferences: [],
      createdComments: [],
      username: "Christian",
      password: "$2a$10$AnAbaVkRtrG.c829veVge.v2gHPZqxW98HPcyxzO.7QFz80.n7tze",
      firstName: "Christian",
      lastName: "Jones",
      email: "test4@gmail.com",
      date: new Date(Date.now()),
      createdPosts: []
   },
   {
      profilePicture: "../img/NoImageFound.png",
      categoryPreferences: [],
      createdComments: [],
      username: "Madeline",
      password: "$2a$10$AnAbaVkRtrG.c829veVge.v2gHPZqxW98HPcyxzO.7QFz80.n7tze",
      firstName: "Madeline",
      lastName: "Jimenez",
      email: "test5@gmail.com",
      date: new Date(Date.now()),
      createdPosts: []
   },
   {
      profilePicture: "../img/NoImageFound.png",
      categoryPreferences: [],
      createdComments: [],
      username: "Seohui",
      password: "$2a$10$AnAbaVkRtrG.c829veVge.v2gHPZqxW98HPcyxzO.7QFz80.n7tze",
      firstName: "Seohui",
      lastName: "Choe",
      email: "test6@gmail.com",
      date: new Date(Date.now()),
      createdPosts: []
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

