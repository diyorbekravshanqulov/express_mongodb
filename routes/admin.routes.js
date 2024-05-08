const { Router } = require("express");

const {
  addAdmin,
  getAdmins,
  getAdminById,
  updateAdminById,
  loginAdmin,
  logoutAdmin,
  deleteAdminById,
  refreshAdminToken,
} = require("../controllers/admin.controller");
const admin_police = require("../middleware/admin_police");

const router = Router();

router.post("/", addAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/logout", refreshAdminToken);
router.get("/", admin_police, getAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdminById);
router.delete("/:id", deleteAdminById);

module.exports = router;
