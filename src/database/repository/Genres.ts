import Genre from "../models/Genre";
import { IGenre, IGenreDocument } from "../../types/interfaces";
import { MongooseError } from "mongoose";

export default class GenresRepository {
    static async createGenre({
        name,
    }: IGenre): Promise<IGenreDocument | MongooseError | undefined> {
        try {
            const genre = new Genre({
                name,
            });

            await genre.save();
            return genre;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    }

    static async getGenreById(id: string): Promise<IGenreDocument | MongooseError | undefined | null> {
        try {
            const genre: IGenreDocument | null = await Genre.findById(id);

            return genre;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    }

    static async getGenreByName(name: string): Promise<IGenreDocument | MongooseError | undefined | null> {
        try {
            const genre: IGenreDocument | null = await Genre.findOne({ name });

            return genre;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    }

    static async getAllGenres(): Promise<IGenreDocument[] | MongooseError | undefined | null> {
        try {
            const genres: IGenreDocument[] = await Genre.find();

            return genres;
        }
        catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }

            console.log(error);
        }
    }
}