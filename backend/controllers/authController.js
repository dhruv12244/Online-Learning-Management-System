const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');

const JWT_SECRET = 'your_jwt_secret_key';

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'samyakjain',
      { expiresIn: '24h' }
    );

    return res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ error: 'Registration failed due to server error.' });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.role !== role) {
      return res.status(403).json({ error: `Access denied. Incorrect role for this account.` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful!',
      user_id: user.id,
      username: user.name,
      role: user.role,
      token,
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'Login failed due to server error.' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { name, email, role, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { name, email, role } });
    if (!user) {
      return res.status(404).json({ error: 'User not found with provided details.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful!' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ error: 'Password reset failed due to server error.' });
  }
};