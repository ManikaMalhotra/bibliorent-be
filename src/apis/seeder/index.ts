import { Router } from 'express';
import BooksRepository from '../../database/repository/Books';
import { IFindBooksParams } from "../../types/params";
import { seedGenres } from './genres';
import { seedBooks } from './books';

const router: Router = Router();

router.get('/test', async (req, res) => {
    const books = await seedBooks();

    res.json(books);
});

export default router;