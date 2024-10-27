import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./user.interface";
import UserModel from "./user.model"
import config from "../../config";
import { createToken } from "./user.utils";

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
    const newUser = new UserModel(userData);
    return await newUser.save();
};

const loginUser = async (payload: TLoginUser) => {
    const {email, password} = payload;
    console.log(email)
    // checking if the user is exist
    const user = await UserModel.findOne({ email });
    console.log("user 1", user?.password)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    console.log("user 2", user._id)
    //checking if the password is correct
  
    if (!(user?.password === password)) {
        throw new Error("password didn't matched")
    }
    if (!(user?.email === email)) {
        throw new Error("password didn't matched")
    }
  
    //create token and sent to the  client
  
    const jwtPayload = {
      userId: user?._id,
      role: user?.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  

  
    return accessToken;
  };
const getUserProfileFromDB = async (id : string) => {
  const result = await UserModel.findById(id);
  if (!result) {
    throw new Error("something went wrong")
  }
  return result
}
const updateUserProfileIntoDB = async (id : string, data : Partial<TUser>) => {
  const result = await UserModel.findByIdAndUpdate(id, data, {new : true});
  if (!result) {
    throw new Error("something went wrong")
  }
  return result
}

const getAllUsersFromDB = async () => {
  try {
    const result = await UserModel.find({});
  if (!result) {
    throw new Error("something went wrong")
  }
  return result;
  } catch (error) {
    console.log(error)
  }
}

const promoteUser = async (userId: unknown) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
  } catch (error) {
    console.log(error)
  }
};

export const userService = {
    createUserIntoDB,
    loginUser, 
    getUserProfileFromDB,
    updateUserProfileIntoDB,
    getAllUsersFromDB,
    promoteUser
}