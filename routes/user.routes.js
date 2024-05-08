const { Router } = require("express");
const user_police = require("../middleware/user_police");

const {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  loginUser,
  logoutUser,
  deleteUserById,
  refreshUserToken,
} = require("../controllers/user.controller");

const router = Router();

router.post("/", addUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshUserToken);
router.get("/", user_police, getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
