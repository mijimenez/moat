const mongoose = require("mongoose");
const User = require("../models/user");
const NewPost = require("../models/NewPost");


mongoose.connect(
   process.env.MONGODB_URI ||
   "mongodb://localhost/moatDB"
);

const userSeed = [
   {
      username: "PolkaDotMask",
      password: "Testing_1",
      email: "test@gmail.com",
      date: new Date(Date.now()),
      createdPosts: [
         "5e966dae089aab309c5b0344"
      ]
   },
   {
      username: "StaySixFeetAwayPlease",
      password: "Password_1",
      email: "test2@gmail.com",
      date: new Date(Date.now()),
      createdPosts: [
         "5e966dae089aab309c5b0345"
      ]
   },
   {
      username: "TestUser",
      password: "Password_1",
      email: "test3@gmail.com",
      date: new Date(Date.now()),
      createdPosts: [
         
      ]
   },
   {
      username: "Christian",
      password: "Password_1",
      email: "test4@gmail.com",
      date: new Date(Date.now()),
      createdPosts: [
         "5e966dae089aab309c5b0347"
      ]
   },
   {
      username: "Madeline",
      password: "Password_1",
      email: "test5@gmail.com",
      date: new Date(Date.now()),
      createdPosts: [
         "5e966dae089aab309c5b0346"
      ]
   },
   {
      username: "Seohui",
      password: "Password_1",
      email: "test6@gmail.com",
      date: new Date(Date.now()),
      createdPosts: [
         "5e966dae089aab309c5b0348"
      ]
   }
];

const newSeed = [
   {
      fakePost_Id: "5e966dae089aab309c5b0344",
      postTitle: "Washer is leaking out the back.",
      postBody: "Hey, so last week I was doing laundry when I heard a big thud from the laundry room. Going into investigate I couldn't figure out what caused the sound but now when I do laundry the washer leaks water. It's one of those portcullis washers with the little window in the front. Attaching a picture. Any advice?",
      comments: [1,2,3],
      date: new Date(Date.now())
   },
   {
      fakePost_Id: "5e966dae089aab309c5b0345",
      postTitle: "Lawnmowers keeps shutting down.",
      postBody: "I was mowing the lawn last week and my lawnmower kept stopping. I made sure the gas was full and the oil was good. It would go for a little bit and then sputter out. Help!",
      comments: [1,2,3,4],
      date: new Date(Date.now())
   },
   {
      fakePost_Id: "5e966dae089aab309c5b0346",
      postTitle: "Curly Hair Help",
      postBody: "I need help keeping my hair curly. I have naturally straight / wavey hair. I do curls but they never last longer than an hour. Any tips?",
      comments: [1,2,3,4,5,6,7],
      date: new Date(Date.now())
   },
   {
      fakePost_Id: "5e966dae089aab309c5b0347",
      postTitle: "Wifi keeps breaking",
      postBody: "Yo, my wifi keep breaking. I don't know why. I try turn off and on, but still broken. pls help",
      comments: [1,2,3,4,5,6,7,8,9,10],
      date: "2020-03-15T23:57:23.520Z"
   },
   {
      fakePost_Id: "5e966dae089aab309c5b0348",
      postTitle: "LOL Rank",
      postBody: "I want to be challenjuer, and I'm a support main. What can I do?",
      comments: [1,2],
      date: new Date(Date.now())
   }
]



User
   .deleteMany({})
   .then(() => User.collection.insertMany(userSeed))
   .then(data => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
   })
   .then(NewPost)
   .catch(err => {
      console.error(err);
      process.exit(1);
   });

   NewPost
   .deleteMany({})
   .then(() => NewPost.collection.insertMany(newSeed))
   .then(({ fakePost_Id }) => User.collection.findOneAndUpdate({}, { $push: { notes: fakePost_Id } }, { new: true }))
   .then(data => {
      console.log(data.result.n + " records inserted!");
      process.exit(0)
   })
   .catch(err => {
      console.error(err);
      process.exit(1);
   });