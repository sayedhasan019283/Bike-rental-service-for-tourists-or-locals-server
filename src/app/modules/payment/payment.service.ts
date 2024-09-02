// src/services/payment.service.ts
import Stripe from 'stripe';
import { Payment } from './payment.interface';

const stripe = new Stripe(
  'sk_test_51L3e4UHgA3BXfMiI0W9hc8m2Ktg5mcizBde6giWRkuy0Kq49etFEyepQtaAzUyZyjgVbKIhyZBBzl0Bv2nu9WKIf00MCh9JSr2',
  { apiVersion: '2024-06-20' },
);

export const createPaymentIntent = async (paymentData: Payment) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: paymentData.amount,
    currency: 'usd',
  });

  return paymentIntent.client_secret;
};
