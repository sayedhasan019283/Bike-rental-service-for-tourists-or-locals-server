/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TUser } from './user.interface';
import { userService } from './user.service';
import { NextFunction, Request, Response } from 'express'; 
import config from '../../config';
import UserModel from './user.model';
import AppError from '../../errors/AppError';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body;
        

        const result = await userService.createUserIntoDB(userData);

        if (!result) {
            throw new Error("User not created successfully");
        }

        const modifiedResult: Partial<TUser> = {
            _id: result?._id,  
            name: result?.name,
            email: result?.email,
            phone: result?.phone,
            address: result?.address,
            role: result?.role,
            createdAt: result?.createdAt,
            updatedAt: result?.updatedAt
          };

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'User registered successfully',
            data: modifiedResult
        });
    } catch (error) {
        next(error); 
    }
};

const loginUser = catchAsync(async (req, res) => {
    console.log(req.body)
    const result = await userService.loginUser(req.body);
    const {email} = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    console.log(user)
    const accessToken = result;
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      token: accessToken,
      data: user
    });
  
  });

  const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {userId , role } = req.user;
      console.log(req.user)
      const result = await userService.getUserProfileFromDB(userId);

      if (!result) {
        throw new Error("something went wrong")
      }
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "User profile retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error)
    }
  }
  const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {userId } = req.user;
      const data = req.body;
      const result = await userService.updateUserProfileIntoDB(userId, data);

      if (!result) {
        throw new Error("something went wrong")
      }
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Profile updated successfully",
        data: result
      });
    } catch (error) {
      next(error)
    }
  }

  const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.getAllUsersFromDB();

      if (!result) {
        throw new Error("something went wrong")
      }
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "All Users retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error)
    }
  }

  const promoteAnUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      console.log(id)

    const result = await userService.promoteUser(id);
    if (!result) {
      throw new Error("something went wrong")
    }
    } catch (error) {
      console.log(error)
    }

  }

export const userController = {
    createUser,
    loginUser, 
    getUserProfile,
    updateProfile,
    getAllUsers,
    promoteAnUser
};
