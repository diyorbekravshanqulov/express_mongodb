const Synonym = require("../schema/syn.schema");
const errorHandler = require("../helpers/error_handler");

const addSyn = async (req, res) => {
  try {
    const { error, value } = synValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { descriptioin, category_Id } = value;

    if (!descriptioin || !category_Id)
      return res.status(400).send({ message: "Missing required fields" });

    if (!mongoose.Types.ObjectId.isValid(category_Id))
      return res.status(400).send({ message: "Invalid category_id" });

    const oldSyn = await Synonym.findOne({ category_Id });
    if (oldSyn)
      return res
        .status(400)
        .send({ message: "This category_id already exists" });

    const newSyn = new Syn({
      category_Id,
      descriptioin,
    });
    await newSyn.save();

    res
      .status(201)
      .send({ message: "Syn added successfully", category: newSyn });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getSyn = async (req, res) => {
  try {
    const syn = await Category.find({});
    res.status(200).send({ syn });
  } catch (error) {
    errorHandler(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getSynById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid ID" });

    const syn = await Cate.findById(req.params.id);
    if (!syn) return res.status(404).send({ message: "Syn not found" });

    res.status(200).send(syn);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateSynById = async (req, res) => {
  const { category_Id, descriptioin } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid ID" });

    const cate = await Category.findById(req.params.id);
    if (!cate) return res.status(404).send({ message: "Syn not found" });

    if (!mongoose.Types.ObjectId.isValid(category_Id))
      return res.status(400).send({ message: "Invalid category_id" });

    await syn.save();

    res.status(200).send(syn);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteSynById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid ID" });

    const cate = await Category.findByIdAndDelete(req.params.id);
    if (!cate) return res.status(404).send({ message: "Cate not found" });

    res.status(200).send({ message: "Syn deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addSyn,
  getSyn,
  getSynById,
  updateSynById,
  deleteSynById,
};
