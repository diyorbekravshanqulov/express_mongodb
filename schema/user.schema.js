const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
    },
    user_photo: {
      type: String,
      validate: {
        validator: function (value) {
          return isValidImageUrlOrFilePath(value);
        },
        message: (props) => `${props.value} is not a valid photo`,
      },
    },
    user_phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\d{2}-\d{3}-\d{2}-\d{2}$/.test(value);
        },
        message: (props) => `${props.value} - number is wrong`,
      },
      maxLength: 12,
    },
    user_password: {
      type: String,
      required: true,
      minLength: [6, "Poral juda qisqa"],
      // maxLength: [20, "Parol juda uzun"],
    },
    user_is_active: {
      type: Boolean,
    },
    created_date: {
      type: Date,
      default: Date.now,
      validate: {
        validator: function (value) {
          return !isNaN(value);
        },
        message: (props) => `${props.value} is not a valid date`,
      },
    },
    update_date: {
      type: Date,
      default: Date.now,
      validate: {
        validator: function (value) {
          return !isNaN(value);
        },
        message: (props) => `${props.value} is not a valid date`,
      },
    },
    user_info: {
      type: String,
    },
    user_token: {
      type: String,
    },
    admin_ativation_link: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("user", userSchema);
