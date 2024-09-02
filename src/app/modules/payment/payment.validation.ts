// src/validations/payment.validation.ts
import { z } from 'zod';

export const createPaymentSchema = z.object({
  amount: z.number().min(50), // Minimum amount, for example 50 cents
});
