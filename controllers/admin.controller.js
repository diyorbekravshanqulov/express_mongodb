const Admin = require("../schema/admin.schema");
const errorHandler = require("../helpers/error_handler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const myJwt = require("../services/jwt_servives");
const { to } = require("../helpers/to_promise");

const addAdmin = async (req, res) => {
  try {
    const {
      admin_name,
      admin_email,
      admin_phone,
      admin_password,
      admin_is_active,
      admin_is_creator,
      created_date,
      update_date,
    } = req.body;

    const hashedPassword = bcrypt.hashSync(admin_password, 7);
    const admin_ativation_link = uuid.v4();


    const newAdmin = new Admin({
      admin_name,
      admin_email,
      admin_phone,
      admin_password: hashedPassword,
      admin_is_active,
      admin_is_creator,
      created_date,
      update_date,
      admin_ativation_link,
    });
    await newAdmin.save();

    await mail_service.sendActivationMail(
      admin_email,
      `${config.get("apiUrl")}:${config.get(
        "port"
      )}/api/admin/activate/${admin_ativation_link}`
    );

    const payload = {
      id: Admin._id,
      is_expert: Admin.is_expert,
      adminRoles: ["READ", "WRITE"],
      admin_is_active: newAdmin.admin_is_active,
    };

    const tokens = myJwt.generateTokens(payload);

    newAdmin.admin_token;
    await newAdmin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refreshms"),
      httpOnly: true,
    });

    res.status(201).send({ newAdmin, ...tokens });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getAdminName = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.name))
      return res.status(400).send({ message: "Invalid name" });

    const book = await Auth.findById(req.params.name);
    if (!book) return res.status(404).send({ message: "Admin not found" });

    res.status(200).send(book);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAdminById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid admin ID" });

    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send({ message: "Admin not found" });

    res.status(200).send(admin);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAdminById = async (req, res) => {
  const {
    admin_name,
    admin_email,
    admin_phone,
    admin_password,
    admin_is_active,
    admin_is_creator,
    created_date,
    update_date,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid admin ID" });

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        admin_name: admin_name,
        admin_email: admin_email,
        admin_phone: admin_phone,
        admin_password: admin_password,
        admin_is_active: admin_is_active,
        admin_is_creator: admin_is_creator,
        created_date: created_date,
        update_date: update_date,
      },
      { new: true }
    );

    if (!admin) return res.status(404).send({ message: "Admin not found" });

    res.status(200).send(admin);
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const admin = await Admin.findOne({ admin_email });
    console.log(admin);
    if (!admin)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    const validPassword = bcrypt.compareSync(
      admin_password, // Frontenddan kelgan ochiq password
      admin.admin_password // bazadan kelgan hashlangan password
    );
    if (!validPassword)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri 2" });

    const payload = {
      id: admin._id,
    };

    const tokens = myJwt.generateTokens(payload);

    admin.admin_token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refreshms"),
    });
    res.status(200).send(tokens);
  } catch (error) {
    errorHandler(res, error);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Not found refreshToken in Cookie" });
    }
    let admin = await Admin.findOneAndUpdate(
      { admin_token: refreshToken },
      { admin_token: "" },
      { new: true }
    );
    if (!admin) {
      return res.status(400).send({
        message: "Invalid token_",
      });
    }

    res.clearCookie("refreshToken");
    res.send({ admin });
  } catch (error) {
    console.log(error);
  }
};

const deleteAdminById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid admin ID" });

    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).send({ message: "Admin not found" });

    res.status(200).send({ message: "Admin deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Not found refreshToken in Cookie" });
    }
    const [error, adminDataFromCookie] = await to(
      myJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return status(403).send({ message: "Not allowed(token is wrong)" });
    }
    const adminDataFromDB = await Admin.findOne({
      admin_token: refreshToken,
    });
    if (!adminDataFromDB) {
      return status(403).send({ message: "Not allowed(not found admin)" });
    }

    const payload = {
      id: adminDataFromDB._id,
      is_expert: adminDataFromDB.is_expert,
    };

    const tokens = myJwt.generateTokens(payload);

    adminDataFromDB.admin_token = tokens.refreshToken;
    await adminDataFromDB.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refreshms"),
      httpOnly: true,
    });

    res.status(201).send(tokens);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const deleteAdminAll = async (req, res) => {
  try {
    const del = await Admin.deleteMany({});
    if (del.deletedCount === 0) {
      return res.status(404).send({ message: "No admin found to delete" });
    }

    res.status(200).send({ message: "All admin deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const adminActivate = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      admin_ativation_link: req.params.link,
    });
    if (!admin) {
      return res.status(400).send({ message: "Admin not found" });
    }
    if (admin.admin_is_active) {
      return res.status(400).send({ message: "Admin already activate" });
    }
    admin.admin_is_active = true;
    await admin.save();
    res.send({
      admin_is_active: admin.admin_is_active,
      message: "Admin activated",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAdmin,
  getAdmins,
  getAdminById,
  updateAdminById,
  loginAdmin,
  logoutAdmin,
  deleteAdminById,
  refreshAdminToken,
  deleteAdminAll,
  adminActivate,
};
