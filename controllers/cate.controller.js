const Category = require("../schema/cate.schema");
const errorHandler = require("../helpers/error_handler");

const addCate = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { category_name, category_Id } = value;

    if (!category_name || !category_Id)
      return res.status(400).send({ message: "Missing required fields" });

    if (!mongoose.Types.ObjectId.isValid(category_Id))
      return res.status(400).send({ message: "Invalid category_id" });

    const oldCategory = await Category.findOne({ category_Id });
    if (oldCategory)
      return res
        .status(400)
        .send({ message: "This category_id already exists" });

    const newCategory = new Category({
      category_Id,
      category_name,
    });
    await newCategory.save();

    res
      .status(201)
      .send({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCate = async (req, res) => {
  try {
    const term = await Category.find({});
    res.status(200).send({ term });
  } catch (error) {
    errorHandler(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getCateById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid ID" });

    const book = await Cate.findById(req.params.id);
    if (!book) return res.status(404).send({ message: "Cate not found" });

    res.status(200).send(book);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateCateById = async (req, res) => {
  const { category_Id, category_name } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid ID" });

    const cate = await Category.findById(req.params.id);
    if (!cate) return res.status(404).send({ message: "Cate not found" });

    if (!mongoose.Types.ObjectId.isValid(category_Id))
      return res.status(400).send({ message: "Invalid category_id" });

    await cate.save();

    res.status(200).send(cate);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteCateById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid ID" });

    const cate = await Category.findByIdAndDelete(req.params.id);
    if (!cate) return res.status(404).send({ message: "Cate not found" });

    res.status(200).send({ message: "Cate deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addCate,
  getCate,
  getCateById,
  updateCateById,
  deleteCateById,
};
