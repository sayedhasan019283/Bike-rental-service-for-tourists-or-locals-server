import { Error } from "mongoose"
import { IBike } from "./bike.interface"
import { BikeModel } from "./bike.model"

const createBikeIntoDB = async (payload : IBike) => {
  try {
    const result = await BikeModel.create(payload)
    if (!result) {
      throw new Error('Result is not defined');
    }
    return result;
  } catch (error) {
    return error
  }
}

const retrieveAllBikesFromDB = async () => {
  try {
    const result = await BikeModel.find({});
    if (!result) {
      throw new Error('No Data Found');
    }
    return result
  } catch (error) {
    return error
  }
}

const updateBikeIntoDB = async (data : Partial<IBike>, id : string) => {
  try {
    const result = await BikeModel.findByIdAndUpdate(id, data, { new: true })
    if (!result) {
      throw new Error('update failed');
    }
    return result
  } catch (error) {
    return error
  }
}

const deleteBikeFromDB = async (id: string) => {
  const result = BikeModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error('delete failed');
  }
  return result;
}
export const bikeService = {
  createBikeIntoDB,
  retrieveAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB
}