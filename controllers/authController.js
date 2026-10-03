const { registerValidation, loginValidation } = require('../validations/authValidation');
const authService = require('../services/authService');
const { sendWelcomeEmail } = require('../utils/emailService');

const register = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await authService.registerUser(req.body);
    
    // Non-blocking email sending
    sendWelcomeEmail(user.email, user.username).catch(err => console.error('Email error:', err));

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const result = await authService.loginUser(req.body.email, req.body.password);
    res.status(200).json({ message: 'Login successful', token: result.token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { register, login, getProfile };