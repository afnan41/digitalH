import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createUserSchema, updateUserSchema } from '../validations/userValidation';

const prisma = new PrismaClient();

// Create a new user with the original UUID ID
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation failed',
        issues: parsed.error.format(),
      });
      return;
    }

    const { firstName, lastName, email, bio, avatar } = parsed.data;

    const user = await prisma.user.create({
      data: { 
        firstName, 
        lastName, 
        email, 
        bio, 
        avatar,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', detail: err });
  }
};

// Get all users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// Get a user by their original UUID ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Get the UUID id from the URL params
    const user = await prisma.user.findUnique({ where: { id: id } }); // Search by original UUID ID
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  };
  

// Update a user by their original UUID id
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Get the UUID id from the URL params

  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: 'Validation failed',
      issues: parsed.error.format(),
    });
    return;
  }

  try {
    const user = await prisma.user.update({
      where: { id: id }, // Use the original UUID id for the update
      data: parsed.data,
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update user', detail: err });
  }
};

// Delete a user by their original UUID id
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Get the UUID id from the URL params

  try {
    const user = await prisma.user.delete({
      where: { id: id }, // Use the original UUID id for the deletion
    });

    res.json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete user', detail: err });
  }
};
