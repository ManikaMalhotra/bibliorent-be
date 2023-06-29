import { Router } from 'express';
import BooksRepository from '../../database/repository/Books';
import { IFindBooksParams } from "../../types/params";

const router: Router = Router();

router.get('/test', async (req, res) => {
    const books = await BooksRepository.getBooks({
        title: 'harry',
        sortBy: 'dop',
        limit: 10,
        skip: 0,
    } as IFindBooksParams);

    res.json(books);
});

export default router;