// src/controllers/payment.controller.ts

import { NextFunction, Request, Response } from "express";
import { createPaymentIntent } from "./payment.service";
import { createPaymentSchema } from "./payment.validation";


export const createPayment = async (req:Request, res:Response, next: NextFunction) => {
  try {
    const validatedData = createPaymentSchema.parse(req.body);

    const clientSecret = await createPaymentIntent(validatedData);
    res.status(200).json({ clientSecret });
  } catch (error) {
    next(error)
  }
};
