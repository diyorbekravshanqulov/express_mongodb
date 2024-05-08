const Joi = require("joi");

exports.synValidation = (data) => {
  const schema = Joi.object({
    descriptioin: Joi.string(),
    category_id: Joi.Joi.string().alphanum().message("ID notogri"),
  });

  return schema.validate(data, { abortEarly: false });
};
