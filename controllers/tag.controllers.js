const { errorHandler } = require("../helpers/error_hendler");
const tag = require("../schema/tag.schema");

const addTag = async (req, res) => {
  const { topic_id, category_id } = req.body;
  try {
    const newtag = await tag.create({
      topic_id,
      category_id,
    });
    res.status(201).send({ message: "Added new tag", newtag });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTag = async (req, res) => {
  try {
    const gettag = await tag.find({});
    res.status(200).send({ message: gettag });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTagByID = async (req, res) => {
  try {
    const gettagById = await tag.find({ _id: req.params.id });
    res.status(200).send({ message: gettagById });
  } catch (error) {
    errorHandler(res, error);
  }
};


const updatedTagByID = async (req, res) => {
  const { topic_id, category_id } = req.body;
  try {
    const updatetagByID = await tag.updateOne(
      { _id: req.params.id },
      { topic_id, category_id }
    );
    res.status(200).send({ message: updatetagByID });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deletedTagByID = async (req, res) => {
  try {
    const deltagById = await tag.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send({ message: deltagById });
  } catch (error) {
    errorHandler(res, error);
  }
};


module.exports = {
  addTag,
  getTag,
  getTagByID,
  deletedTagByID,
  updatedTagByID,
};
