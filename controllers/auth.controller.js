const Author = require("../schema/auth.schema");
const errorHandler = require("../helpers/error_handler");
const { authorValidation } = require("../validations/author.validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const myJwt = require("../services/jwt_servives");
const { to } = require("../helpers/to_promise");

const uuid = require("uuid");
const mail_service = require("../services/mail_service");

const addAuth = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password,
      author_info,
      author_position,
      author_photo,
      is_expert,
      author_is_active,
    } = value;

    const hashedPassword = bcrypt.hashSync(author_password, 7);

    const author_ativation_link = uuid.v4();

    const newAuthor = new Author({
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password: hashedPassword,
      author_info,
      author_position,
      author_photo,
      is_expert,
      author_is_active,
      author_ativation_link,
    });
    await newAuthor.save();

    await mail_service.sendActivationMail(
      author_email,
      `${config.get("apiUrl")}:${config.get(
        "port"
      )}/api/auth/activate/${author_ativation_link}`
    );

    const payload = {
      id: Author._id,
      is_expert: Author.is_expert,
      authorRoles: ["READ", "WRITE"],
      author_is_active: newAuthor.author_is_active,
    };

    const tokens = myJwt.generateTokens(payload);

    newAuthor.author_token;
    await newAuthor.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refreshms"),
      httpOnly: true,
    });

    res.status(201).send({ payload, ...tokens });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuth = async (req, res) => {
  try {
    const auth = await Author.find({});
    res.status(200).send({ auth });
  } catch (error) {
    errorHandler(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getAuthByID = async (req, res) => {
  try {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id))
    //   return res.status(400).send({ message: "Invalid id" });
    const idAuth = req.author.id;

    console.log();
    const { id } = req.params;

    if (idAuth !== id) {
      return res.status(403).send({ message: "Only you can show your ID" });
    }

    const auth = await Author.findById(req.params.id);
    if (!auth) return res.status(404).send({ message: "Author not found" });

    res.status(200).send(auth);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAuthByID = async (req, res) => {
  const {
    author_first_name,
    author_last_name,
    author_nick_name,
    author_email,
    author_phone,
    author_password,
    author_info,
    author_position,
    author_photo,
    is_expert,
    author_is_active,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.name))
      return res.status(400).send({ message: "Invalid author" });

    const cate = await Author.findById(req.params.name);
    if (!cate) return res.status(404).send({ message: "Author not found" });

    await cate.save();

    res.status(200).send(cate);
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { author_email, author_password } = req.body;
    const author = await Author.findOne({ author_email });
    console.log(author);
    if (!author)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    const validPassword = bcrypt.compareSync(
      author_password, // Frontenddan kelgan ochiq password
      author.author_password // bazadan kelgan hashlangan password
    );
    if (!validPassword)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });

    const payload = {
      id: author._id,
      is_expert: author.is_expert,
      authorRoles: ["READ", "WRITE"],
    };

    const tokens = myJwt.generateTokens(payload);

    author.author_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refreshms"),
      httpOnly: true,
    });

    // //uncaughtException
    // try {
    //   setTimeout(function () {
    //     var err = new Error("uncaughtException example");
    //     throw err;
    //   }, 1000);
    // } catch (error) {
    //   console.log(error);
    // }
    // // unhandledRejection
    // new Promise((_, reject) => reject(new Error("unhandledRejection example")));

    res.status(200).send(tokens);
  } catch (error) {
    errorHandler(res, error);
  }
};

const logoutAuthor = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Not found refreshToken in Cookie" });
    }
    let author = await Author.findOneAndUpdate(
      { author_token: refreshToken },
      { author_token: "" },
      { new: true }
    );
    if (!author) {
      return res.status(400).send({
        message: "Invalid token_",
      });
    }

    res.clearCookie("refreshToken");
    res.send({ author });
  } catch (error) {
    console.log(error);
  }
};

const refreshAuthorToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Not found refreshToken in Cookie" });
    }
    const [error, authorDataFromCookie] = await to(
      myJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return status(403).send({ message: "Not allowed(token is wrong)" });
    }
    const authorDataFromDB = await Author.findOne({
      author_token: refreshToken,
    });
    if (!authorDataFromDB) {
      return status(403).send({ message: "Not allowed(not found author)" });
    }

    const payload = {
      id: authorDataFromDB._id,
      is_expert: authorDataFromDB.is_expert,
    };

    const tokens = myJwt.generateTokens(payload);

    authorDataFromDB.author_token = tokens.refreshToken;
    await authorDataFromDB.save();

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

const deleteAuthByID = async (req, res) => {
  try {
    const cate = await Author.findByIdAndDelete(req.params.name);
    if (!cate) return res.status(404).send({ message: "Author not found" });

    res.status(200).send({ message: "Author deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAuthAll = async (req, res) => {
  try {
    const del = await Author.deleteMany({});
    if (del.deletedCount === 0) {
      return res.status(404).send({ message: "No authors found to delete" });
    }

    res.status(200).send({ message: "All authors deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const authorActivate = async (req, res) => {
  try {
    const author = await Author.findOne({
      author_ativation_link: req.params.link,
    });
    if (!author) {
      return res.status(400).send({ message: "Author not found" });
    }
    if (author.author_is_active) {
      return res.status(400).send({ message: "Author already activate" });
    }
    author.author_is_active = true;
    await author.save();
    res.send({
      author_is_active: author.author_is_active,
      message: "Author activated",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAuth,
  getAuth,
  getAuthByID,
  updateAuthByID,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  deleteAuthByID,
  deleteAuthAll,
  authorActivate,
};
