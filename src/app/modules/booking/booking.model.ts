import mongoose, { Schema } from 'mongoose';
import IBooking from './booking.interface';

const BookingSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId,require: true, default: null, ref: 'User' },
  bikeId: { type: Schema.Types.ObjectId, required: true, ref: 'Bike' },
  startTime: { type: Date, required: true },
  returnTime: { type: Date, default: null },
  totalCost: { type: Number, required: true, default: 0 },
  isReturned: { type: Boolean, required: true, default: false },
});

export const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);
