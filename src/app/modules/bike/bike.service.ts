import { Error } from "mongoose"
import { IBike } from "./bike.interface"
import { BikeModel } from "./bike.model"
import { FilterQuery } from 'mongoose';

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

const retrieveAllBikesFromDB = async ( ) => {
  try {
    // Calculate the number of documents to skip based on the current page
    const page = 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Fetch the data with pagination
    const result = await BikeModel.find({})
      .limit(limit)
      .skip(skip);

    // Check if the result is empty
    if (!result || result.length === 0) {
      throw new Error('No Data Found');
    }

    return result;
  } catch (error) {
    return { error: error };
  }
};


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
const retrieveSingleBikeFromDB = async ( id : string) => {
  try {
    const result = await BikeModel.findById(id)
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


interface FilterParams {
  brand?: string;
  price?: number;
  limit?: string;
  page?: string;
}

const filterProducts = async (filters: FilterParams) => {
  // Define query type based on the BikeModel schema
  const query: FilterQuery<typeof BikeModel> = {};

  if (filters.brand) query.brand = { $regex: filters.brand, $options: 'i' };
  if (filters.price) query.pricePerHour = { $lte: filters.price };

  // Set pagination
  const limit = parseInt(filters.limit || '10', 10);  // Ensure limit is a number
  const page = parseInt(filters.page || '1', 10);  // Ensure page is a number
  const skip = (page - 1) * limit;

  try {
    const products = await BikeModel.find(query).skip(skip).limit(limit);
    return products;
  } catch (error) {
    throw new Error(`Failed to retrieve products: ${error}`);
  }
};

export const findItems = async (query: string) => {
  if (!query) return []; // Return empty array if no query

  // Modify the search logic as per your schema, here searching by 'name'
  const items = await BikeModel.find({
    name: { $regex: query, $options: 'i' }, // Case-insensitive regex search
  });

  return items;
};
export const bikeService = {
  createBikeIntoDB,
  retrieveAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
  retrieveSingleBikeFromDB,
  filterProducts,
  findItems,
}