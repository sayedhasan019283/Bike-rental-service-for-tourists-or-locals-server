import { Router } from 'express';
import { bikeRoutes } from '../modules/bike/bike.route';
import { bookingRoutes } from '../modules/booking/booking.route';
import { userRoutes } from '../modules/user/user.route';
import { openRoutes } from '../modules/open/open.route';
import { paymentRoutes } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
 
  {
    path: '/',
    route: openRoutes,
  },
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
  {
    path: '/api',
    route: paymentRoutes,
  },
  
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
