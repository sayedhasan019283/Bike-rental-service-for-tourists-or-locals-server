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
  auth(USER_ROLE.admin),
  bookingController.ReturnBikeAndUpdate
)
router.get(
  '/rentals',
  auth(USER_ROLE.admin, USER_ROLE.user),
  bookingController.GetAllRentals
)



export const bookingRoutes = router;
