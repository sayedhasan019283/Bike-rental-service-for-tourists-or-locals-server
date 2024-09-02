import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bikeValidation } from './bike.validation';
import { bikeController } from './bike.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/bikes',
  auth(USER_ROLE.admin),
  validateRequest(bikeValidation.createBikeSchema),
  bikeController.createBike
 );
 router.get(
  '/bikes',
  bikeController.retrieveAllBikes
 )
 router.put(
  '/bikes/:id',
  // auth(USER_ROLE.admin),
  validateRequest(bikeValidation.updateBikeSchema),
  bikeController.updateBike
 )
 router.get(
  '/bike/:id',
  // auth(USER_ROLE.admin),
  validateRequest(bikeValidation.updateBikeSchema),
  bikeController.retrieveSingleBike
 )
 router.delete(
  '/bikes/:id',
  // auth(USER_ROLE.admin),
  bikeController.deleteBike,
 )



export const bikeRoutes = router;
