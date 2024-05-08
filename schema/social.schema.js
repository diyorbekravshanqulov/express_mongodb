const { Schema, model } = require("mongoose");

const socialSchema = new Schema(
  {
    social_name: {
      type: String,
      trim: true,
    },
    social_icon_file: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("social", socialSchema);
