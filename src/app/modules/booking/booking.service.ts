/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { BikeModel } from '../bike/bike.model';
import { initiatePayment } from '../payment/payment.utils';
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
  try {
    const result = await BookingModel.find({ userId: id, isReturned: false });
  console.log(result);
  if (!result) {
    throw new Error("didn't find any rental");
  }
  return result;
  } catch (error) {
    return error;
  }
};

const getAllRental = async () => {
  try {
    const result = await BookingModel.find({});
    console.log(result)
    if (!result) {
      throw new Error('no rental exist')
    }
  return result;
  } catch (error) {
    return error
  }
}

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

const getSingleBooking = async  (id: string) => {
  try {
    const result = await BookingModel.findById({ _id : id  });
    if (!result) {
      throw new Error('did not get rentals ');
    }
  return result;
  } catch (error) {
    console.log(error);
  }
};


const paymentSpecificBookingIntoDB  = async (payload : any) => {
  console.log({payload})
  const {totalCost, userInfo : user} = payload;
  const transactionId = `TXN-${Date.now()}`;

  

  const paymentData = {
      transactionId,
      totalCost,
      custormerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      customerAddress: user.address
  }

  console.log({paymentData})

      //payment
      const paymentSession = await initiatePayment(paymentData);

      console.log({paymentSession})
  
      return paymentSession;
  
}



export const bookingService = {
  CreateRentalIntoDB,
  ReturnBikeAndUpdateDB,
  GetAllRentalsFromDB,
  retrieveSingleRentalFromDB,
  getSingleBooking,
  paymentSpecificBookingIntoDB,
  getAllRental
};
