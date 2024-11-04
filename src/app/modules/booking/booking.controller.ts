import { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const CreateRental = async (req: Request, res: Response, next : NextFunction) => {

    try {
        const data = req.body;
        const {userId} = req.user;
        console.log( "from controller",{data}, userId)
        // console.log("hear", typeof(data.startTime))
        const result = await bookingService.CreateRentalIntoDB(data , userId);
        console.log('controller' ,result)
        if (!result) {
            throw new Error("error to create rental")
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Rental created successfully",
            data: result,
          });
    } catch (error) {
     next(error)   
    }
}


const ReturnBikeAndUpdate = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const {id} = req.params;
    const result = await bookingService.ReturnBikeAndUpdateDB(id)
    console.log('hear',result)
    if (!result) {
        throw new Error("bike not found")
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "bike returned successfully",
        data: result,
      });
  } catch (error) {
    next(error)
  }
}

const GetAllRentals = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const {userId} = req.user;
    const result = await bookingService.GetAllRentalsFromDB(userId);
    if (!result) {
      throw new Error("didn't get data")
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Rentals retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
}

const retrieveSingleRental = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const {id} = req.params
      console.log(id)
      const result = await bookingService.retrieveSingleRentalFromDB( id);
      console.log(result)

      if (!result) {
          throw new Error("bike update failed");
      }
      res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Bike updated successfully",
          data: result,
        });
  } catch (error) {
      next(error)
  }
}


const GetSingleRentals = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const {id} = req.params
    console.log('id from controller' ,id)
    const result = await bookingService.getSingleBooking(id);
    if (!result) {
      throw new Error("did not get rentals ")
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Single Rentals retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
}

const paymentSpecificBooking = catchAsync( async (req: Request, res: Response) => {
     
  const result = await bookingService.paymentSpecificBookingIntoDB(req.body);
  console.log({result})
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Car Payment successfully",
      data: result
  })
})

const getAllRental = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const result = await bookingService.getAllRental();
    console.log("all rental", result)
    if (!result) {
      throw new Error("No data Found")
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All Rentals retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export const bookingController = {
    CreateRental,
    ReturnBikeAndUpdate,
    GetAllRentals,
    retrieveSingleRental,
    GetSingleRentals,
    paymentSpecificBooking,
    getAllRental
}