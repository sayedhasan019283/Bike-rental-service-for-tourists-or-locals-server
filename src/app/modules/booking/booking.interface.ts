import  { Types} from 'mongoose';

interface IBooking  {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date | null;
  totalCost: number;
  isReturned: boolean;
}


export default IBooking;
