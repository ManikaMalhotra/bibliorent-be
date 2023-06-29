import Book from "../models/Book";
import { IBook, IBookDocument, IGenreDocument } from "../../types/interfaces";
import { IFindBooksParams, IFindBooksQuery } from "../../types/params";
import GenresRepository from "./Genres";
import { MongooseError, Query } from "mongoose";

export default class BooksRepository {
    static async createBook({
        title,
        author,
        genre,
        dop,
        availableCopies,
    }: IBook): Promise<IBookDocument | MongooseError | undefined> {
        try {
            const book = new Book({
                title,
                author,
                genre,
                dop,
                availableCopies,
            });

            await book.save();
            return book;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    }

    static async getBookById(id: string): Promise<IBookDocument | MongooseError | undefined | null> {
        try {
            const book: IBookDocument | null = await Book.findById(id);

            return book;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    }

    static async getBooks({
        title,
        author,
        genre,
        dopStart,
        dopEnd,
        sortBy,
        limit,
        skip,
    }: IFindBooksParams): Promise<Array<IBookDocument> | MongooseError | undefined | null> {
        try {
            const sort: string = sortBy === 'none' ? '' : sortBy;
            const query = {} as IFindBooksQuery;

            if (title) {
                query['title'] = new RegExp(`^${title}`, 'i');
            }

            if (author) {
                query['author'] = new RegExp(`^${author}`, 'i');
            }

            if (genre) {
                const genreDocument: IGenreDocument | MongooseError | undefined | null = await GenresRepository.getGenreByName(genre);

                if (genreDocument instanceof MongooseError) {
                    return genreDocument;
                }

                query['genre'] = genreDocument?._id;
            }

            if (dopStart && dopEnd) {
                query['dop'] = {
                    '$gte': dopStart,
                    '$lte': dopEnd,
                };
            }

            const books: Array<IBookDocument> = await Book
                .find(query)
                .sort(sort)
                .limit(limit)
                .skip(skip);

            return books;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    };

    static async autocompleteBook(query: string) {
        try {
            const books: IBookDocument[] | null = await Book
                .aggregate([
                    {
                        '$match': {
                            '$or': [
                                {
                                    'title': {
                                        '$regex': new RegExp(`^${query}`),
                                        '$options': 'i'
                                    }
                                }, {
                                    'author': {
                                        '$regex': new RegExp(`^${query}`),
                                        '$options': 'i'
                                    }
                                }
                            ]
                        }
                    }, {
                        '$lookup': {
                            'from': 'genres',
                            'localField': 'genre',
                            'foreignField': '_id',
                            'as': 'genre'
                        }
                    }, {
                        '$unwind': {
                            'path': '$genre'
                        }
                    }, {
                        '$project': {
                            'title': 1,
                            'author': 1,
                            'genre': '$genre.name',
                            'dop': 1,
                            'availableBooks': 1
                        }
                    }
                ]);

            return books;
        } catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }
};