const { errorHandler } = require("../helpers/error_hendler");
const descTopic = require("../schema/descTopic.schema");

const addDescTopic = async (req, res) => {
  const { desc_id, topic_id } = req.body;
  try {
    const newdescTopic = await descTopic.create({
      desc_id,
      topic_id,
    });
    res
      .status(201)
      .send({ message: "Added new descTopic", newdescTopic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescTopic = async (req, res) => {
  try {
    const getdescTopic = await descTopic.find({});
    res.status(200).send({ message: getdescTopic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescTopicByID = async (req, res) => {
  try {
    const getdescTopicById = await descTopic.find({ _id: req.params.id });
    res.status(200).send({ message: getdescTopicById });
  } catch (error) {
    errorHandler(res, error);
  }
};


const updatedDescTopicByID = async (req, res) => {
  const { desc_id, topic_id } = req.body;
  try {
    const updatedescTopicByID = await descTopic.updateOne(
      { _id: req.params.id },
      { desc_id, topic_id }
    );
    res.status(200).send({ message: updatedescTopicByID });
  } catch (error) {
    errorHandler(res, error);
  }
};


const deletedDescTopicByID = async (req, res) => {
  try {
    const deldescTopicById = await descTopic.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send({ message: deldescTopicById });
  } catch (error) {
    errorHandler(res, error);
  }
};


module.exports = {
  addDescTopic,
  getDescTopic,
  getDescTopicByID,
  deletedDescTopicByID,
  updatedDescTopicByID,
};
