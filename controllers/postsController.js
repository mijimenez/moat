const db = require("../models");
const router = require("express").Router();
const express = require("express");
const passport = require("../passport");

// Defining methods for the booksController
module.exports = {
   findAll: function (req, res) {
      db.Book
         .find(req.query)
         .sort({ _id: -1 })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },
   note: function (req, res) {
      console.log(req.body)
      db.Note.create(req.body)
      .then((savedNote) => {
         res.json(savedNote)
      }).catch((err) => {
         res.json(err)
      })
   },






   remove: function (req, res) {
      db.Book
         .deleteOne({ _id: req.params.id })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   }
};
