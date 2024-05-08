const { errorHandler } = require("../helpers/error_hendler");
const topic = require("../schema/topic.schema");

const addTopic = async (req, res) => {
  const {
    author_id,
    topic_title,
    topic_text,
    create_date,
    update_date,
    is_checked,
    is_approved,
    expert_id,
  } = req.body;
  try {
    const newtopic = await topic.create({
      author_id,
      topic_title,
      topic_text,
      create_date,
      update_date,
      is_checked,
      is_approved,
      expert_id,
    });
    res.status(201).send({ message: "Added new topic", newtopic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTopic = async (req, res) => {
  try {
    const gettopic = await topic.find({});
    res.status(200).send({ message: gettopic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTopicByID = async (req, res) => {
  try {
    const gettopicById = await topic.find({ _id: req.params.id });
    res.status(200).send({ message: gettopicById });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deletedTopicByID = async (req, res) => {
  try {
    const deltopicById = await topic.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send({ message: deltopicById });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updatedTopicByID = async (req, res) => {
  const {
    author_id,
    topic_title,
    topic_text,
    create_date,
    update_date,
    is_checked,
    is_approved,
    expert_id,
  } = req.body;
  try {
    const updatetopicByID = await topic.updateOne(
      { _id: req.params.id },
      {
        author_id,
        topic_title,
        topic_text,
        create_date,
        update_date,
        is_checked,
        is_approved,
        expert_id,
      }
    );
    res.status(200).send({ message: updatetopicByID });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addTopic,
  getTopic,
  getTopicByID,
  deletedTopicByID,
  updatedTopicByID,
};
