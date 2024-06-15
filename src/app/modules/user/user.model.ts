import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';


const UserSchema: Schema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'] }
},{
    timestamps: true
});





const UserModel = model<TUser>('User', UserSchema);

export default UserModel;
