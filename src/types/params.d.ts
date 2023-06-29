import { Types } from "mongoose";

export interface IFindBooksParams {
    title?: string;
    author?: string;
    dopStart?: Date;
    dopEnd?: Date;
    genre?: string;
    sortBy: 'none' | 'title' | 'author' | 'dop';
    limit: number;
    skip: number;
}

export interface IFindBooksQuery {
    title?: RegExp;
    author?: RegExp;
    dop?: {
        $gte: Date;
        $lte: Date;
    }
    genre?: Types.ObjectId;
    sortBy: 'none' | 'title' | 'author' | 'dop';
    limit: number;
    skip: number;
}