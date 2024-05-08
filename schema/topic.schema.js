const { Schema, model } = require("mongoose");

const topicSchema = new Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "author",
    },
    topic_title: {
      type: String,
      trim: true,
      uppercase: true,
    },
    topic_text: {
      type: String,
      trim: true,
      lowercase: true,
    },
    create_date: {
      type: Date,
    },
    update_date: {
      type: Date,
    },
    is_checked: {
      type: Boolean,
    },
    is_approved: {
      type: Boolean,
    },
    expert_id: {
      type: Schema.Types.ObjectId,
      ref: "auth",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("topic", topicSchema);
