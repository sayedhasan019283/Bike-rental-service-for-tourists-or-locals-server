import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { bookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

router.post('/rentals',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(bookingValidation.createBookingSchema),
  bookingController.CreateRental
)

router.put(
  '/rentals/:id/return',
  auth(USER_ROLE.admin, USER_ROLE.user),
  bookingController.ReturnBikeAndUpdate
)
router.get(
  '/rentals',
  auth(USER_ROLE.admin, USER_ROLE.user),
  bookingController.GetAllRentals
)
router.get(
  '/rental',
  auth(USER_ROLE.admin),
  bookingController.getAllRental
)
router.get(
  '/rentals/:id',
  bookingController.retrieveSingleRental
)
router.get(
  '/single/rentals/:id',
  bookingController.GetSingleRentals
)

router.post("/pay", 
  bookingController.paymentSpecificBooking
)



export const bookingRoutes = router;
