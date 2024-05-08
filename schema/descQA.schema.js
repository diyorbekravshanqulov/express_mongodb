const { Schema, model } = require("mongoose");

const descQASchema = new Schema(
  {
    qa_id: {
      type: Schema.Types.ObjectId,
      ref: "QuesAnswer",
    },
    desc_id: {
      type: Schema.Types.ObjectId,
      ref: "dictionary",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("descQA", descQASchema);
