import jwt from 'jsonwebtoken';
import { User } from '../Models/User.js';

export const Athenticated = async (req, res, next) => {
  const authHeader = req.header('Authorization'); // ✅ Use "Authorization"

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ message: 'login first' });
  }

  const token = authHeader.split(' ')[1]; // ✅ Extract token after "Bearer"

  try {
    const decoded = jwt.verify(token, '@!jajkaf77()');
    const id = decoded.userId;

    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: 'user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
