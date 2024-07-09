const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendResponse = require('../utils/responseHandler');
const nodemailer = require('nodemailer');


exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return sendResponse(res, 400, 'Username or email already exists');
    }

    const user = new User({ username, email, password, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const userResponse = user.toObject();
    delete userResponse.password;
    userResponse.token = token;

    sendResponse(res, 200, 'User registered successfully', userResponse);
  } catch (error) {
    sendResponse(res, 500, 'Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 400, 'Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return sendResponse(res, 400, 'Invalid email or password');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const userResponse = user.toObject();
    delete userResponse.password;
    userResponse.token = token;

    sendResponse(res, 200, 'Login successful', userResponse);
  } catch (error) {
    sendResponse(res, 500, 'Server error');
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpires = otpExpires;
    await user.save();

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password or app password
      },
    });

    // Send email
    await transporter.sendMail({
      from: '"Blog Platform App" <your@email.com>',
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It will expire in 5 minutes.`,
      html: `<b>Your OTP for password reset is: ${otp}. It will expire in 5 minutes.</b>`,
    });

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.resetPasswordOtp;
    delete userResponse.resetPasswordOtpExpires;
    sendResponse(res, 200, 'OTP sent to your email', userResponse);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, 'Server error');
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ 
      email, 
      resetPasswordOtp: otp,
      resetPasswordOtpExpires: { $gt: Date.now() }
    });

    if (!user) {
      return sendResponse(res, 400, 'Invalid or expired OTP');
    }

    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;
    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.resetPasswordOtp;
    delete userResponse.resetPasswordOtpExpires;


    sendResponse(res, 200, 'Password reset successfully', userResponse);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, 'Server error');
  }
};