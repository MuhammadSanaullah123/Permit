const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   POST api/user
// @desc    Register User
// @access  Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("company", "Company is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters and must contain one lowercase and uppercase alphabet!"
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z]).*$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, company, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        company,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: /* 1800 */ 360000 },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 36000 * 1000),
            path: "/",
          });
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            company: user.company,
            role: user.role,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/auth
// @desc    Authenticate User & get token
// @access  Public

router.post(
  "/auth",
  [
    check("username", "Please enter a valid email").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user_username = await User.findOne({ name: username });
      let user_email = await User.findOne({ email: username });
      let user;
      if (user_username) {
        user = user_username;
      } else if (user_email) {
        user = user_email;
      } else if (!user_username && !user_email) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: /* 1800 */ 36000 },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 36000 * 1000),
            path: "/",
          });
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            company: user.company,
            role: user.role,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
router.post("/logout", auth, async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Public
router.get(
  "/",
  auth,

  async (req, res) => {
    try {
      const users = await User.find({ role: "user" }).select("-password");

      res.status(200).json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @desc    Update user
// @route   patch /api/users
// @access  Public
router.patch(
  "/",
  auth,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const users = await User.findById(req.user.id);
      let { name, image, company, email, description, password } = req.body;

      if (email !== users.email) {
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Email already exists" }] });
        }
        users.email = email;
      }
      if (password) {
        const isMatch = await bcrypt.compare(password, users.password);
        if (!isMatch) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
          if (!passwordRegex.test(password) && password.length < 8) {
            return res.status(404).json({
              msg: "Please enter a password with 6 or more characters and must contain one lowercase and uppercase alphabet!",
            });
          }
          const salt = await bcrypt.genSalt(10);

          users.password = await bcrypt.hash(password, salt);
        }
      }

      users.name = name;
      users.company = company;
      users.description = description;
      users.image = image;
      await users.save();
      const payload = {
        user: {
          id: users.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: /* 1800 */ 36000 },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 36000 * 1000),
            path: "/",
          });
          return res.status(200).json({
            _id: users._id,
            name: users.name,
            email: users.email,
            company: users.company,
            role: users.role,
            updatedAt: users.updatedAt,
            createdAt: users.createdAt,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Public
router.get("/:id", auth, async (req, res) => {
  try {
    const users = await User.findById(req.params.id).select("-password");

    if (!users) {
      return res.status(404).json({ msg: "Users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
