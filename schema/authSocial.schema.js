const { Schema, model } = require("mongoose");

const authorSocialSchema = new Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "auth",
    },
    social_id: {
      type: Schema.Types.ObjectId,
      ref: "social",
    },
    social_link: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("AuthorSocial", authorSocialSchema);
