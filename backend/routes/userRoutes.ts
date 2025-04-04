import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser, // Import deleteUser
} from '../controllers/userController';

const router = express.Router();

// Define routes
router.post('/users', createUser);  // Create a new user
router.get('/users', getUsers);  // Get all users
router.get('/users/:id', getUserById);  // Get user by ID
router.put('/users/:id', updateUser);  // Update a user by simpleId
router.delete('/users/:id', deleteUser);  // Delete a user by simpleId

export default router;
