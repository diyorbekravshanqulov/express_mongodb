const { Schema, model } = require("mongoose");

const cateSchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category_Id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Category", cateSchema);
