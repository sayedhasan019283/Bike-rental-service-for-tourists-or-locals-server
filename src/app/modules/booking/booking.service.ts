/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { BikeModel } from '../bike/bike.model';
import IBooking from './booking.interface';
import { BookingModel } from './booking.model';

const CreateRentalIntoDB = async (payload: Partial<IBooking>, id: any) => {
  try {
    const bikeId = payload.bikeId;
    console.log('Bike id', bikeId);
    // console.log(typeof(bikeId))// string
    const Bike = await BikeModel.findOne({ _id: bikeId });
    console.log({ Bike });
    if (!Bike) {
      throw new Error("bike didn't found with this id");
    }
    const result = await BookingModel.create(payload);
    if (!result) {
      throw new Error("didn't booking successfully");
    }
    result.userId = id;
    await result.save();
    console.log('hear', result);

    if (Bike?.isAvailable) {
      Bike.isAvailable = false;
      await Bike.save();
    } else {
      throw new Error('Bike is not available for rent');
    }

    return result;
  } catch (error) {
    // console.log({error})
    return error;
  }
};

const ReturnBikeAndUpdateDB = async (id: string) => {
  try {
    const order = await BookingModel.findById(id);
    if (!order) {
      throw new Error('order not found');
    }
    // console.log(order)
    // Extract startTime and returnTime from responseData
    const startTime = new Date(order.startTime);

    const returnTime = new Date();

    // Calculate the difference in milliseconds
    const timeDifferenceMs = returnTime.getTime() - startTime.getTime();

    const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    //  console.log(hours)
    order.returnTime = returnTime;
    const bike = await BikeModel.findOne(order.bikeId);
    // console.log(bike)
    if (!bike) {
      throw new Error("bike didn't found");
    }

    order.totalCost = bike?.pricePerHour * hours;
    order.isReturned = true;
    bike.isAvailable = true;
    await bike.save();
    await order.save();

    return order;
  } catch (error) {
    return error;
  }
};

const GetAllRentalsFromDB = async (id: string) => {
  const result = await BookingModel.find({ userId: id, isReturned: false });
  console.log(result);
  if (!result) {
    throw new Error("didn't find any rental");
  }
  return result;
};

const retrieveSingleRentalFromDB = async (id: string) => {
  try {
    const result = await BookingModel.findById(id);
    if (!result) {
      throw new Error('update failed');
    }
    return result;
  } catch (error) {
    return error;
  }
};

export const bookingService = {
  CreateRentalIntoDB,
  ReturnBikeAndUpdateDB,
  GetAllRentalsFromDB,
  retrieveSingleRentalFromDB,
};
