import { Router, Request, Response } from 'express';
import { handleUserLogin, handleUserRegister } from './controller';
import auth from '../../middlewares/auth';

const router: Router = Router();

router.route('/')
    .get((req: Request, res: Response) => {
        res.send('users route');
    })
    .get(auth, (req: Request, res: Response): void => {
        res.send('users route');
    });

router.route('/login')
    .post(handleUserLogin);

router.route('/register')
    .post(handleUserRegister);

export default router;