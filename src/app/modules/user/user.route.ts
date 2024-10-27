import  express  from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router()

router.post(
    '/auth/signup',
    validateRequest(userValidation.UserSchema),
    userController.createUser
)

router.post( 
    '/auth/login',
    validateRequest(userValidation.loginValidationSchema),
    userController.loginUser,
  );
router.get( 
    '/users/me',
    auth(USER_ROLE.user, USER_ROLE.admin),
    userController.getUserProfile,
  );
router.get( 
    '/users',
    auth( USER_ROLE.admin),
    userController.getAllUsers,
  );
router.put( 
    '/users/me',
    validateRequest(userValidation.UpdateUserValidationSchema),
    auth(USER_ROLE.user, USER_ROLE.admin),
    userController.updateProfile,
  );

router.patch(
  '/users/:id/promote',
  // auth( USER_ROLE.admin),
  userController.promoteAnUser,
)


export const userRoutes = router;