const imageModel = require("../models/img.models");
const fs = require("fs");

//@desc upload image
//@route POST /api/image/upload
//@access private
const imgUpload = async (req, res) => {
  try {
    console.log("I;m there-->");
    console.log(req.body);
    const saveImage = imageModel({
      user_id: req.body.user_id,
      img: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
    });
    saveImage
      .save()
      .then((res) => {
        console.log("image is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
    console.log("image is saved");
    res.send("image is saved");
  } catch (error) {
    console.log("error");
    res.status(500).send(error.message);
  }
};

//@desc get image
//@route GET /api/image/:id
//@access private
const getImg = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await imageModel.findOne({ user_id: req.params.id });
    // console.log("data ->", data.img.data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

//@desc update image
//@route PUT /api/image/:id
//@access private
const updateImg = async (req, res) => {
  try {
    const existingImage = await imageModel.findOne({
      user_id: req.params.id,
    });
    if (!existingImage) {
      return res.status(404).send("Image not found");
    }

    existingImage.img = {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    };

    const updatedImage = await existingImage.save();
    console.log("Image is updated");
    console.log(updatedImage);
    res.send(updatedImage);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  imgUpload,
  getImg,
  updateImg,
};
