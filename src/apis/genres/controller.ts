import { Response } from "express";
import { UserRequest } from "../../types/expressTypes";
import GenresRepository from "../../database/repository/Genres";

export const getGenres = async (req: UserRequest, res: Response) => {
    try {
        const genres = await GenresRepository.getAllGenres();

        res.json(genres);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}