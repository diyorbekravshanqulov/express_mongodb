const Joi = require("joi");

exports.userValidation = (data) => {
  const schema = Joi.object({
    user_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .min(2)
      .max(50)
      .lowercase(),
    user_password: Joi.string().min(6),
    confirm_password: Joi.ref("user_password"),
    user_email: Joi.string().email(),
    user_info: Joi.string(),
    user_phone: Joi.string().pattern(new RegExp(/^\d{2}-\d{3}-\d{2}-\d{2}$/)),
    user_is_active: Joi.boolean().default(false),
    user_is_creator: Joi.boolean().default(false),
    created_date: Joi.date().format("YYYY-MM-DD").utc(),
    update_date: Joi.date().format("YYYY-MM-DD").utc(),
    admin_token: Joi.string(),
  });

  return schema.validate(data, { abortEarly: false });
};
