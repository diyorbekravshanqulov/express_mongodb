const { Router } = require("express");

const {
  addSyn,
  getSyn,
  getSynById,
  updateSynById,
  deleteSynById,
} = require("../controllers/syn.controller");

const router = Router();

router.post("/", addSyn);
router.get("/", getSyn);
router.get("/:id", getSynById);
router.put("/:id", updateSynById);
router.delete("/:id", deleteSynById);

module.exports = router;
