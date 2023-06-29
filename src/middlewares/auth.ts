import { UserRequest } from '../types/expressTypes';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const { jwtSecret, authCookieName } = config;

const auth = (req: UserRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies[authCookieName];

    if(!token) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded === 'string') {
            res.status(401).json({message: 'Invalid token'});
            return;
        }

        if (!decoded) {
            res.status(401).json({message: 'Invalid token'});
            return;
        }

        req.user = {id: decoded.id};
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).json({message: 'Invalid token'});
    }
};

export default auth;