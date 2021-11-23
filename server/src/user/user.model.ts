import {model, Schema} from "mongoose";

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    avatar: String,
    age: Number
});

export interface IUser {
    _id: string;
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
    age: number;
}

export const User = model<IUser>('User', userSchema);
