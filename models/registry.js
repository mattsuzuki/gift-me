const mongoose = require('mongoose');
// Optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const registriesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    }
  },
description: {
    type: String,
 
  },
  items: {
    title: String, 
    URL: String, 
  }, 

}, {
  // Mongoose will automatically add and maintain
  // a createdAt and updatedAt property on the docs
  timestamps: true
});

module.exports = mongoose.model('Registry', registriesSchema);