const Joi = require("joi");

exports.adminValidation = (data) => {
  const schema = Joi.object({
    admin_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .min(2)
      .max(50)
      .lowercase(),
    admin_password: Joi.string().min(6),
    confirm_password: Joi.ref("admin_password"),
    author_photo: Joi.string().default("/user/photo.png"),
    admin_email: Joi.string().email(),
    admin_phone: Joi.string().pattern(new RegExp(/^\d{2}-\d{3}-\d{2}-\d{2}$/)),
    admin_is_active: Joi.boolean().default(false),
    created_date: Joi.date().format("YYYY-MM-DD").utc(),
    update_date: Joi.date().format("YYYY-MM-DD").utc(),
    user_token: Joi.string(),
  });

  return schema.validate(data, { abortEarly: false });
};
