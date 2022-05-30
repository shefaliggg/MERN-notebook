const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "harryisagoodboy";

//Route 1: signup - no login required

router.post(
  "/createuser",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("name", "Use min 5 characters").isLength({ min: 5 }),
    body("password", "Use Min 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //validate and return error
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    //check if email exist
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry user with this email already exist" });
      } else {
        //create user
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });

        const data = {
          user: {
            id: user.id,
          },
        };
        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success,authtoken });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Something went wrong");
    }
  }
);

//Route 2: login the user

router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    //validate and return error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check if email exist
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({success, error: "Wrong Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Something went wrong");
    }
  }
);

//Route 3: Fetch user profile data from database
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
