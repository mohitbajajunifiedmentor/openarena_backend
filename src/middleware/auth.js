import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export async function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    if (!user || !user.isActive) {
      return next(new ApiError(401, 'Invalid or inactive account'));
    }
    req.user = user;
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Insufficient permissions'));
    }
    next();
  };
}
