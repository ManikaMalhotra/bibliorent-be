import { Mongoose, MongooseError, HydratedDocument } from "mongoose";
import { IUser, IUserDocument } from "../../types/interfaces";
import User from "../models/User";

export default class UserRepository {
    static async createUser({
        name,
        email,
        password,
        isAdmin,
        loggedInWithGoogle,
    }: IUser): Promise<IUserDocument | MongooseError | undefined> {
        try {
            const user: IUserDocument = new User({
                name,
                email,
                password,
                isAdmin,
                loggedInWithGoogle,
            });

            await user.save();
            return user;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    }

    static async getUserById(id: string): Promise<IUserDocument | MongooseError | undefined | null> {
        try {
            const user: IUserDocument | null = await User.findById(id);

            return user;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    }

    static async getUserByEmail(email: string): Promise<IUserDocument | MongooseError | undefined | null> {
        try {
            const user: IUserDocument | null = await User.findOne({ email });

            return user;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    }
}