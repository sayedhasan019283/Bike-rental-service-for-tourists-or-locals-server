import { z } from 'zod';

const createBookingSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    bikeId: z.string(),
    startTime: z.string(),
    returnTime: z.date().nullable().optional(),
    totalCost: z.number().min(0).optional(),
    isReturned: z.boolean().optional(),
  })
});

export type BookingType = z.infer<typeof createBookingSchema>;

export const bookingValidation = {
  createBookingSchema,
};
