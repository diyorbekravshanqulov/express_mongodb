const Joi = require("joi");

exports.categoryValidation = (data) => {
  const schema = Joi.object({
    category_name: Joi.string()
      .min(2)
      .message("Kategoriya nomi 2 ta harfdan uzun bolishi kerak")
      .max(100)
      .message("Kategoriya nomi 100 ta harfdan kam bolishi kerak")
      .required(),
    parent_category_id: Joi.string().alphanum().message("ID notogri"),
  });

  return schema.validate(data, { abortEarly: false });
};
