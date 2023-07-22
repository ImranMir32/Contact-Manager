const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ massgae: "All field are mendatory " });
    }
    const userAvailable = await Users.findOne({ email });
    if (userAvailable) {
      return res.status(400).send({ massgae: "User already registered! " });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    console.log(`User created ${newUser}`);
    if (newUser) {
      return res.status(201).json({ _id: newUser.id, email: newUser.email });
    } else {
      return res.status(400).res.json("User data is not valid");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc login user
//@route POST /api/user/login
//@access public

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ massgae: "All field are mendatory " });
    }

    const user = await Users.findOne({ email });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        // generate token
        const token = jwt.sign(
          {
            name: user.username,
            userId: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.expiresTime,
          }
        );

        res.status(200).json({
          access_token: token,
          user: user,
          message: "Login successful!",
        });
      } else {
        res.status(401).json({
          error: "Authetication failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authetication failed!",
      });
    }
  } catch {
    res.status(401).json({
      error: "Authetication failed!",
    });
  }
};

//@desc Current user Info
//@route GET /api/user/current
//@access private
const currentUser = async (req, res) => {
  try {
    res.status(201).send({ message: "current" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
