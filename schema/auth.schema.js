const { required } = require("joi");
const { Schema, model } = require("mongoose");

const authSchema = new Schema(
  {
    author_first_name: {
      type: String,
      required: true,
      trim: true,
    },
    author_last_name: {
      type: String,
      required: true,
    },
    author_nick_name: {
      type: String,
      required: true,
      // unique: true,
    },
    author_email: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
    },
    author_phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\d{2}-\d{3}-\d{2}-\d{2}$/.test(value); // 93-375-72-62
        },
        message: (props) => `${props.value} - number is wrong`,
      },
      maxLength: 12,
    },
    author_password: {
      type: String,
      required: true,
      minLength: [6, "Poral juda qisqa"],
      // maxLength: [20, "Parol juda uzun"],
    },
    author_info: {
      type: String,
    },
    author_position: {
      type: String,
    },
    author_photo: {
      type: String,
    },
    is_expert: {
      type: Boolean,
      default: false,
    },
    author_is_active: {
      type: Boolean,
    },
    author_token: {
      type: String,
    },
    author_ativation_link: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Author", authSchema);
