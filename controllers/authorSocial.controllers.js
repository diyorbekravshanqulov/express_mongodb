const { errorHandler } = require("../helpers/error_hendler");
const authorSocial = require("../schema/authSocial.schema");

const addAuthSocial = async (req, res) => {
  const { author_id, social_id, social_link } = req.body;
  try {
    const newauthorSocial = await authorSocial.create({
      author_id,
      social_id,
      social_link,
    });
    res
      .status(201)
      .send({ message: "Added new Social", newauthorSocial });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuthSocial = async (req, res) => {
  try {
    const getauthSocial = await authorSocial.find({});
    res.status(200).send({ message: getauthSocial });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuthSocialByID = async (req, res) => {
  try {
    const id = req.params.id;
    const getauthSocialById = await authorSocial.find({ _id: id});
    res.status(200).send({ message: getauthSocialById });
  } catch (error) {
    errorHandler(res, error);
  }
};



const updatedAuthSocialByID = async (req, res) => {
  const { author_id, social_id, social_link } = req.body;
  const id = req.body.id;
  try {
    const updateauthorSocialByID = await authorSocial.updateOne(
      { _id: id },
      { author_id, social_id, social_link }
    );
    res.status(200).send({ message: updateauthorSocialByID });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deletedAuthSocialByID = async (req, res) => {
  try {
    const delauthorSocialById = await authorSocial.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send({ message: delauthorSocialById });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAuthSocial,
  getAuthSocial,
  getAuthSocialByID,
  deletedAuthSocialByID,
  updatedAuthSocialByID,
};
