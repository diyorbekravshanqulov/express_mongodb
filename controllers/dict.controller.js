const Dictionary = require("../schema/dictionary.schema");
const errorHandler = require("../helpers/error_handler");

const addTerm = async (req, res) => {
  try {
    const { term } = req.body;
    const existingTerm = await Dictionary.findOne({
      term: { $regex: new RegExp("^" + term + "$", "i") },
    });
    if (existingTerm) {
      return res.status(200).send({ message: "This term already exists!" });
    }
    const newTerm = new Dictionary({
      term,
      letter: term[0],
    });
    await newTerm.save();
    res.status(201).send({ message: "New term added" });
  } catch (error) {
    errorHandler(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getTerm = async (req, res) => {
  try {
    const term = await Dictionary.find({});
    res.status(200).send({ term });
  } catch (error) {
    errorHandler(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getTermByLetter = async (req, res) => {
  try {
    let { letter } = req.params;
    letter = letter.toUpperCase();
    const term = await Dictionary.findOne({
      letter: letter,
    });
    res.status(200).send({ term });
  } catch (error) {
    errorHandler(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
const getTermByTerm = async (req, res) => {
  try {
    let { term } = req.params;
    const term1 = await Dictionary.findOne({
      term: term,
    });
    res.status(200).send({ term1 });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateTermByTerm = async (req, res) => {
  const { term, letter } = req.body;
  try {
    
    const dict = await Dictionary.findById(req.params.term);
    if (!dict) return res.status(404).send({ message: "Dict not found" });

    Dictionary.term = term;
    Dictionary.letter = letter;

    await dict.save();

    res.status(200).send(cate);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteTermByTerm = async (req, res) => {
  try {
    const term = await Dictionary.findByIdAndDelete(req.params.term);
    if (!term) return res.status(404).send({ message: "Dict not found" });

    res.status(200).send({ message: "Dict deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addTerm,
  getTerm,
  getTermByLetter,
  getTermByTerm,
  updateTermByTerm,
  deleteTermByTerm,
};
