const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendResponse = require('../utils/responseHandler');

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