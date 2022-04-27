const mongoose = require("mongoose");
// Optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
  name: {
    type: String

  }, 
  itemType:{ 
    type: String,
  
  }, 
  URL: {
    type: String
  }, 
  });

const registriesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  items: [itemSchema],
  

  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: String,
  userAvatar: String
}, {
  date: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    },
  
  }, 
  eventType: {
    title: String,
   
  }
});


module.exports = mongoose.model("Registry", registriesSchema);

