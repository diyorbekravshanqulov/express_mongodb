const { Schema, model } = require("mongoose");

const desciptionsSchema = new Schema(
  {
    descriptioin: {
      type: String,
      required: true,
      trim: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { versionKey: false }
);

module.exports = model("Description", desciptionsSchema);
 