const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    admin_name: {
      type: String,
      required: true,
      trim: true,
    },
    admin_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
    },
    admin_phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\d{2}-\d{3}-\d{2}-\d{2}$/.test(value);
        },
        message: (props) => `${props.value} - number is wrong`,
      },
      maxLength: 12,
    },
    admin_password: {
      type: String,
      required: true,
      minLength: [6, "Poral juda qisqa"],
      // maxLength: [20, "Parol juda uzun"],
    },
    admin_is_active: {
      type: Boolean,
    },
    admin_is_creator: {
      type: Boolean,
      default: false,
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
    admin_token: {
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

module.exports = model("admin", adminSchema);
