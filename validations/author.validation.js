const Joi = require("joi");

const authorFullName = (parent) => {
  return parent.author_first_name + " " + parent.author_last_name;
};

exports.authorValidation = (data) => {
  const schema = Joi.object({
    author_first_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .min(2)
      .max(50)
      .lowercase(),

    author_last_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .min(2)
      .max(50),
    author_full_name: Joi.string().default(authorFullName),
    author_nick_name: Joi.string(),
    author_password: Joi.string().min(6),
    confirm_password: Joi.ref("author_password"),
    author_email: Joi.string().email(),
    author_phone: Joi.string().pattern(new RegExp(/^\d{2}-\d{3}-\d{2}-\d{2}$/)),
    author_info: Joi.string(),
    author_position: Joi.string(),
    author_photo: Joi.string().default("/author/avatar.png"),
    is_expert: Joi.boolean().default(false),
    author_is_active: Joi.boolean().default(false),
    author_token: Joi.string(),
    // gender: Joi.string().valid("erkak", "ayol"),
    // birthday: Joi.date().less(new Date("2000-01-01")),
    // birthyear: Joi.number().integer().min(1980).max(2005),
    // refferred: Joi.boolean().default(false),
    // refferredDate: Joi.string().when("reffered", {
    //   is: true,
    //   then: Joi.string().required(),
    //   otherwise: Joi.string().optional(),
    // }),
    // codingLang: Joi.array().items(Joi.string(), Joi.number()),
    // is_yes: Joi.boolean().truthy("YES").valid(true),
  });

  return schema.validate(data, { abortEarly: false });
};
