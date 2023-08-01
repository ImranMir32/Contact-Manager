const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser = async (req, res) => {
  console.log("here->", req.body);
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json("All field are mendatory !");
    }
    const userAvailable = await Users.findOne({ email });
    if (userAvailable) {
      return res.status(400).json("Mail is already used !");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const newUser = new Users({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    console.log(`User created ${newUser}`);
    if (newUser) {
      return res.status(201).json("Account has been created");
    } else {
      return res.status(400).json("User data is not valid !");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc login user
//@route POST /api/user/login
//@access public

const loginUser = async (req, res) => {
  // console.log("req", req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ massgae: "All field are mendatory " });
    }

    const user = await Users.findOne({ email });
    // console.log(user);
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        // console.log("yyyyy");
        // generate token
        const token = jwt.sign(
          {
            name: user.name,
            userId: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        // console.log(token);

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
    console.log(req.user);
    res.json(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Update User
//@route PUT /api/user/:id
//@access private
const updateUser = async (req, res) => {
  // console.log("-->", req.body);
  // console.log("-->", req.params);
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    // console.log("user", user._id);
    // console.log(req.user);
    if (user._id.toString() !== req.user.userId) {
      return res
        .status(403)
        .json("User don't have permission to update other user contacts");
    }

    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  updateUser,
};
