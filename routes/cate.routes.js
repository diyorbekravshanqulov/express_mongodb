const { Router } = require("express");

const {
  addCate,
  getCate,
  getCateById,
  updateCateById,
  deleteCateById,
} = require("../controllers/cate.controller");

const router = Router();

router.post("/", addCate);
router.get("/", getCate);
router.get("/:id", getCateById);
router.put("/:id", updateCateById);
router.delete("/:id", deleteCateById);

module.exports = router;
