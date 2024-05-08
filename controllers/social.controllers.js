const { errorHandler } = require("../helpers/error_hendler");
const social = require("../schema/social.schema");

const addSocial = async (req, res) => {
  const { social_name, social_icon_file } = req.body;
  try {
    const newsocial = await social.create({
      social_name,
      social_icon_file,
    });
    res.status(201).send({ message: "Added new social", newsocial });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getSocial = async (req, res) => {
  try {
    const getsocial = await social.find({});
    res.status(200).send({ message: getsocial });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getSocialByID = async (req, res) => {
  try {
    const getsocialById = await social.find({ _id: req.params.id });
    res.status(200).send({ message: getsocialById });
  } catch (error) {
    errorHandler(res, error);
  }
};


const updatedSocialByID = async (req, res) => {
  const { social_name, social_icon_file } = req.body;
  try {
    const updatesocialByID = await social.updateOne(
      { _id: req.params.id },
      { social_name, social_icon_file }
    );
    res.status(200).send({ message: updatesocialByID });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deletedSocialByID = async (req, res) => {
  try {
    const delsocialById = await social.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send({ message: delsocialById });
  } catch (error) {
    errorHandler(res, error);
  }
};


module.exports = {
  addSocial,
  getSocial,
  getSocialByID,
  deletedSocialByID,
  updatedSocialByID,
};
