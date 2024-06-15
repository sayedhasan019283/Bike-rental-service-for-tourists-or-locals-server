import { z } from 'zod';

const UserSchema = z.object({
   body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
    phone: z.string().min(1, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    role: z.enum(['admin', 'user']),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
   })
});

const UpdateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email address').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
    phone: z.string().min(1, 'Phone number is required').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    role: z.enum(['admin', 'user']).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
  }).partial()
});

const loginValidationSchema = z.object({
    body: z.object({
      email: z.string({ required_error: 'email is required.' }),
      password: z.string({ required_error: 'Password is required' }),
    }),
  });


export const userValidation = {
    UserSchema,
    loginValidationSchema,
    UpdateUserValidationSchema
};
