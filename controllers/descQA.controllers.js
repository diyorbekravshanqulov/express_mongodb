const { errorHandler } = require("../helpers/error_hendler");
const descQA = require("../schema/DescQA");

const addDescQA = async (req, res) => {
  const { qa_id, desc_id } = req.body;
  try {
    const newdescQA = await descQA.create({ qa_id, desc_id });
    res.status(201).send({ message: "Added new descQA", newdescQA });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescQA = async (req, res) => {
  try {
    const getdescQA = await descQA.find({});
    res.status(200).send({ message: getdescQA });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescQAByID = async (req, res) => {
  try {
    const getdescQAById = await descQA.find({ _id: req.params.id });
    res.status(200).send({ message: getdescQAById });
  } catch (error) {
    errorHandler(res, error);
  }
};


const updatedDescQAByID = async (req, res) => {
  const { qa_id, desc_id } = req.body;
  try {
    const updatedescQAByID = await descQA.updateOne(
      { _id: req.params.id },
      { qa_id, desc_id }
    );
    res.status(200).send({ message: updatedescQAByID });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deletedDescQAByID = async (req, res) => {
  try {
    const deldescQAById = await descQA.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: deldescQAById });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addDescQA,
  getDescQA,
  getDescQAByID,
  deletedDescQAByID,
  updatedDescQAByID,
};
