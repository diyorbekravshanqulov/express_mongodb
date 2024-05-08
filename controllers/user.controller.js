const User = require("../schema/user.schema");
const errorHandler = require("../helpers/error_handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const myJwt = require("../services/jwt_servives");
const { to } = require("../helpers/to_promise");
const addUser = async (req, res) => {
  try {
    const {
      user_name,
      user_email,
      user_photo,
      user_phone,
      user_password,
      user_is_active,
      created_date,
      update_date,
      user_info,
    } = req.body;

    const hashedPassword = bcrypt.hashSync(user_password, 7);

    const newUser = new User({
      user_name,
      user_email,
      user_photo,
      user_phone,
      user_password: hashedPassword,
      user_is_active,
      created_date,
      update_date,
      user_info,
      user_ativation_link,
    });
    await newUser.save();

    await mail_service.sendActivationMail(
      user_email,
      `${config.get("apiUrl")}:${config.get(
        "port"
      )}/api/user/activate/${user_ativation_link}`
    );

    const payload = {
      id: User._id,
      is_expert: User.is_expert,
      userRoles: ["READ", "WRITE"],
      user_is_active: newUser.user_is_active,
    };

    const tokens = myJwt.generateTokens(payload);

    newUser.user_token;
    await newUser.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refreshms"),
      httpOnly: true,
    });

    res.status(201).send({ newUser, ...tokens });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const userization = req.headers.userization;
    if (!userization) {
      return res.status(403).json({ message: "user ro'yxatdan o'tmagan" });
    }

    const bearer = userization.split(" ")[0];
    const token = userization.split(" ")[1];

    if (bearer != "Bearer" || !token) {
      return res
        .status(403)
        .json({ message: "user ro'yxatdan o'tmagan (token berilmagan)" });
    }

    const decodedToken = jwt.verify(token, config.get("tokenKey"));
    console.log(decodedToken);
    const users = await User.find({});
    res.status(200).send({ users });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid user ID" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUserById = async (req, res) => {
  const {
    user_name,
    user_email,
    user_photo,
    user_phone,
    user_password,
    user_is_active,
    created_date,
    update_date,
    user_info,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid user ID" });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        user_name,
        user_email,
        user_photo,
        user_phone,
        user_password,
        user_is_active,
        created_date,
        update_date,
        user_info,
      },
      { new: true }
    );

    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { user_name, user_password, user_email } = req.body;
    const user = await User.findOne({ user_email });
    if (!user)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri 1" });
    const validPassword = bcrypt.compareSync(
      user_password, // Frontenddan kelgan ochiq password
      user.user_password // bazadan kelgan hashlangan password
    );
    console.log(validPassword);
    if (!validPassword)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri 2" });

    const payload = {
      id: user._id,
    };

    const tokens = myJwt.generateTokens(payload);

    user.user_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refreshms"),
    });
    res.status(200).send(tokens);
  } catch (error) {
    errorHandler(res, error);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Not found refreshToken in Cookie" });
    }
    let user = await User.findOneAndUpdate(
      { user_token: refreshToken },
      { user_token: "" },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({
        message: "Invalid token_",
      });
    }

    res.clearCookie("refreshToken");
    res.send({ user });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid user ID" });

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const refreshUserToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Not found refreshToken in Cookie" });
    }
    const [error, userDataFromCookie] = await to(
      myJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return status(403).send({ message: "Not allowed(token is wrong)" });
    }
    const userDataFromDB = await User.findOne({
      user_token: refreshToken,
    });
    if (!userDataFromDB) {
      return status(403).send({ message: "Not allowed(not found user)" });
    }

    const payload = {
      id: userDataFromDB._id,
      is_expert: userDataFromDB.is_expert,
    };

    const tokens = myJwt.generateTokens(payload);

    userDataFromDB.user_token = tokens.refreshToken;
    await userDataFromDB.save();

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

const deleteUserAll = async (req, res) => {
  try {
    const del = await User.deleteMany({});
    if (del.deletedCount === 0) {
      return res.status(404).send({ message: "No users found to delete" });
    }

    res.status(200).send({ message: "All users deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const userActivate = async (req, res) => {
  try {
    const user = await User.findOne({
      user_ativation_link: req.params.link,
    });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    if (user.user_is_active) {
      return res.status(400).send({ message: "User already activate" });
    }
    user.user_is_active = true;
    await user.save();
    res.send({
      user_is_active: user.user_is_active,
      message: "User activated",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  loginUser,
  logoutUser,
  deleteUserById,
  refreshUserToken,
  deleteUserAll,
  userActivate,
};
