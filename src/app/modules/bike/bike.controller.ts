import { NextFunction, Request, Response } from "express";
import { bikeService } from "./bike.service";

const createBike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
    if (!data) {
        throw new Error('data is not defined');
      }
    const result = await bikeService.createBikeIntoDB(data)
    if (!result) {
        throw new Error("bike is not created")
    }
    res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Bike added successfully",
        data: result,
      });
    } catch (error) {
        next(error)
    }
}

 const retrieveAllBikes = async (req:Request, res:Response, next: NextFunction) => {
    try {
    const result = await bikeService.retrieveAllBikesFromDB();
    if (!result) {
        throw new Error("bikes retrieved failed");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bikes retrieved successfully",
        data: result,
      });
    } catch (error) {
     next(error)   
    }
 }

 const updateBike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const {id} = req.params
        const result = await bikeService.updateBikeIntoDB( data, id);

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

 const deleteBike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const result = await bikeService.deleteBikeFromDB(id);
        if (!result) {
            throw new Error("bike didn't deleted");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bike deleted successfully",
            data: result,
          });
    } catch (error) {
        next(error)
    }
 }

export const bikeController = {
    createBike,
    retrieveAllBikes,
    updateBike, 
    deleteBike
}