import { Document, Types } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password?: string;
    isAdmin: boolean;
    loggedInWithGoogle: boolean;
}

export type IUserDocument = IUser & Document;

export interface IBook {
    title: string;
    author: string;
    genre: Types.ObjectId;
    dop: Date;
    availableCopies: number;
}

export type IBookDocument = IBook & Document;

export interface IGenre {
    name: string;
}

export type IGenreDocument = IGenre & Document;