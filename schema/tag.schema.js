const { Schema, model } = require("mongoose");

const tagSchema = new Schema(
  {
    topic_id: { 
        type: Schema.Types.ObjectId, 
        ref: "topic" 
    },
    category_id: { 
        type: Schema.Types.ObjectId, 
        ref: "cate" 
    },
  },
  { versionKey: false }
);

module.exports = model("tag", tagSchema);
