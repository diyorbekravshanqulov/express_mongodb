const { errorHandler } = require("../helpers/error_hendler");
const questionAnswer = require("../schema/quesAnswer.schema");

const addQuestionAnswer = async (req, res) => {
  const {
    question,
    answer,
    create_data,
    update_data,
    is_checked,
    user_id,
    expert_id,
  } = req.body;
  try {
    const newquestionAnswer = await questionAnswer.create({
      question,
      answer,
      create_data,
      update_data,
      is_checked,
      user_id,
      expert_id,
    });
    res
      .status(201)
      .send({ message: "Added new QuestionAnswer", newquestionAnswer });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getQuestionAnswer = async (req, res) => {
  try {
    const getquestionAnswer = await questionAnswer.find({});
    res.status(200).send({ message: getquestionAnswer });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getQuestionAnswerByID = async (req, res) => {
  try {
    const getquestionAnswerById = await questionAnswer.find({
      _id: req.params.id,
    });
    res.status(200).send({ message: getquestionAnswerById });
  } catch (error) {
    errorHandler(res, error);
  }
};



const updatedQuestionAnswerByID = async (req, res) => {
  const {
    question,
    answer,
    create_data,
    update_data,
    is_checked,
    user_id,
    expert_id,
  } = req.body;
  try {
    const updatequestionAnswerByID = await questionAnswer.updateOne(
      { _id: req.params.id },
      {
        question,
        answer,
        create_data,
        update_data,
        is_checked,
        user_id,
        expert_id,
      }
    );
    res.status(200).send({ message: updatequestionAnswerByID });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deletedQuestionAnswerByID = async (req, res) => {
  try {
    const delquestionAnswerById = await questionAnswer.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send({ message: delquestionAnswerById });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addQuestionAnswer,
  getQuestionAnswer,
  getQuestionAnswerByID,
  deletedQuestionAnswerByID,
  updatedQuestionAnswerByID,
};
