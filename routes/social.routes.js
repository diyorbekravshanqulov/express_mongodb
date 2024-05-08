const {
  addSocial,
  getSocial,
  getSocialByID,
  updatedSocialByID,
  deletedSocialByID,
} = require("../controllers/social.controllers");

const router = require("express").Router();

router.post("/", addSocial);
router.get("/", getSocial);
router.get("/:id", getSocialByID);
router.put("/:id", updatedSocialByID);
router.delete("/:id", deletedSocialByID);

module.exports = router;
