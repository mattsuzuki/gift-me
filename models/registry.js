const mongoose = require("mongoose");
// Optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
  },
  itemType: {
    type: String,
  },
  URL: {
    type: String,
  },
});

const registriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    items: [itemSchema],
    eventType: {
      type: String,
    },


    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
    userAvatar: String,
  },
  {}
);

module.exports = mongoose.model("Registry", registriesSchema);
