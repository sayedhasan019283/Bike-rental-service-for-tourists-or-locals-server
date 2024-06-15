import { Router } from 'express';
import { bikeRoutes } from '../modules/bike/bike.route';
import { bookingRoutes } from '../modules/booking/booking.route';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/api',
    route: bikeRoutes,
  },
  {
    path: '/api',
    route: bookingRoutes,
  },
  {
    path: '/api',
    route: userRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
