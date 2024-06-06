const User = require("../models/userSchema");
const nodemailer = require('nodemailer');
const Food = require('../models/foodSchema');
const sendVerifyMail = async (username, email, id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'justice.stamm92@ethereal.email',
        pass: 'p94jxVs4g1bvgfj3G6',
      },
    });

    const mailOption = {
      from: 'justice.stamm92@ethereal.email',
      to: email, 
      subject: 'For verification',
      html: `<p>Hello ${username}, Please click here to verify <a href="http://localhost:8080/verify?id=${id}">Verify</a></p>`,
    };

    const info = await transporter.sendMail(mailOption);
    console.log(info.response);
  } catch (error) {
    console.log(error.message);
  }
};

const verify = async (req, res) => {
  try {
    const updateInfo = await User.updateOne({ _id: req.query.id }, { $set: { isVerified: 1 } });
    console.log(updateInfo);
    // res.send('<h1>You are now verified</h1>'); // Uncomment this if you want to send a response
  } catch (error) {
    console.log(error.message);
  }
};

const register_controller = async (req, res) => {
  try {
    let { username, email, password, profile, phone, address } = req.body;
    if (!username || !email || !password || !phone || !address) {
      return res.status(200).send({
        success: false,
        message: "Please enter all entities",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(200).send({
        success: false,
        message: "User already exists",
      });
      return;
    }
    let newUser = new User({
      username: username,
      email: email,
      password: password,
      profile: profile,
      address: address,
      phone: phone,
    });
    await newUser.setPassword(password);
    await newUser.save();
    if (newUser) {
      await sendVerifyMail(username, email, newUser._id); 
    }

    req.login(newUser, (err) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "User didn't login",
        });
      }
    });
    res.status(200).send({
      success: true,
      message: "Registered successfully",
    });
    console.log(newUser);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "User didn't register",
      error,
    });
  }
};

const logout_controller = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send({
      success: true,
      message: "Logout successful",
    });
  });
};

const update_controller = async (req, res) => {
  try {
    let { id } = req.params;
    let { name, address, phone } = req.body;
    let newUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          address: address,
          phone: phone,
        },
      }
    );
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "User didn't update",
    });
  }
};

const addtocart = async (req, res) => {
    const { userId, foodId } = req.params;
  
    try {
      const food = await Food.findById(foodId);
      if (!food) {
        return res.status(404).send('Food item not found');
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }

      user.order.push(food);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
};

module.exports = { register_controller, logout_controller, update_controller, verify, sendVerifyMail, addtocart};
