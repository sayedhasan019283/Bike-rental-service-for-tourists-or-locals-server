import { z } from 'zod';

const createBikeSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    isAvailable: z.boolean().default(true),
    cc: z.number(),
    year: z.number(),
    model: z.string(),
    brand: z.string(),
    photo: z.string(),
  })
});
const updateBikeSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    isAvailable: z.boolean().default(true).optional(),
    cc: z.number().optional(),
    year: z.number().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    photo: z.string().optional()
  })
});

export type Bike = z.infer<typeof createBikeSchema>;

export const bikeValidation ={
  createBikeSchema,
  updateBikeSchema
};
