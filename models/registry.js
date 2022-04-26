const mongoose = require("mongoose");
// Optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const registriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    date: {
      type: Number,
      default: function () {
        return new Date().getFullYear();
      },
    },
    item: {
      type: String,
    },
    eventType: {
      title: String,
      URL: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Registry", registriesSchema);
