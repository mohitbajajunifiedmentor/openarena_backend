import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

export async function register(req, res, next) {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      throw new ApiError(400, 'Name, email, and password are required');
    }
    if (role && role !== 'user') {
      throw new ApiError(400, 'Public signup is for users only. Land owners are created by admin.');
    }
    const exists = await User.findOne({ email });
    if (exists) throw new ApiError(409, 'Email already registered');

    const user = await User.create({ name, email, password, phone, role: 'user' });
    const token = signToken(user);
    res.status(201).json({
      success: true,
      data: { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new ApiError(400, 'Email and password are required');

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid credentials');
    }
    if (!user.isActive) throw new ApiError(403, 'Account is deactivated');

    const token = signToken(user);
    res.json({
      success: true,
      data: { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token },
    });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res) {
  res.json({ success: true, data: req.user });
}

export async function updateProfile(req, res, next) {
  try {
    const { name, phone } = req.body;
    if (name !== undefined) {
      if (!String(name).trim()) throw new ApiError(400, 'Name is required');
      req.user.name = String(name).trim();
    }
    if (phone !== undefined) req.user.phone = String(phone).trim();
    await req.user.save();
    res.json({
      success: true,
      data: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
        createdAt: req.user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}
