import { ApiError } from '../utils/ApiError.js';

export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Duplicate entry' });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
}

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` });
}
