import mongoose from "mongoose";
import {  IBike } from "./bike.interface";

const bikeSchema = new mongoose.Schema<IBike>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  cc: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  photo:{
     type:String,
     required:true 
  }
});

export const BikeModel = mongoose.model<IBike>('Bike', bikeSchema);


