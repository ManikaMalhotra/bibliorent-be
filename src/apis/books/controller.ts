import { Response } from "express";
import { UserRequest } from "../../types/expressTypes";
import BooksRepository from "../../database/repository/Books";
import { IFindBooksParams } from "../../types/params";

export const searchBooks = async (req: UserRequest, res: Response) => {
    try {
        const books = await BooksRepository.getBooks(req.body as IFindBooksParams);

        res.json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const autocompleteBooks = async (req: UserRequest, res: Response) => {
    try {
        const query: string = req.query.query as string;
        const books = await BooksRepository.autocompleteBook(query);

        res.json(books);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}