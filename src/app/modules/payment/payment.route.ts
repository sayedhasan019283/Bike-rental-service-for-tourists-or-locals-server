import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createPaymentSchema } from './payment.validation';
import { createPayment } from './payment.controller';

const router = express.Router();

router.post(
  '/create-payment-intent', createPayment,
  validateRequest(createPaymentSchema),
 );




export const bikeRoutes = router;
