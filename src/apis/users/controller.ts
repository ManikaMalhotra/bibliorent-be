// functions - take in a request, and return a response

import { Request, RequestHandler, Response } from "express";
import { MongooseError } from "mongoose";
import { IUser, IUserDocument } from "../../types/interfaces";
import UserRepository from "../../database/repository/Users";
import { compare } from "../../utils/encrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const { jwtSecret, authCookieName, authCookieExpiry } = config;

export const handleUserLogin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({ message: 'No user or password provided' });
            return;
        }

        const user: IUserDocument | MongooseError | undefined | null = await UserRepository.getUserByEmail(email);

        if (user instanceof MongooseError) {
            if (user.name === 'ValidationError') {
                res.status(400).json({ message: 'Validation error' });
                return;
            }

            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (!user.password) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid: boolean = await compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1d' });

        res.cookie(authCookieName, token, {
            maxAge: authCookieExpiry,
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({ message: 'User logged in successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const handleUserRegister: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, isAdmin, loggedInWithGoogle } = req.body;

    try {
        const findUser: IUserDocument | MongooseError | undefined | null = await UserRepository.getUserByEmail(email);

        if (findUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // create a new user
        const newUser: IUserDocument | MongooseError | undefined = await UserRepository.createUser({
            name,
            email,
            password,
            isAdmin,
            loggedInWithGoogle,
        });

        // handle error
        if (newUser instanceof MongooseError) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // failed to create user
        if (!newUser) {
            res.status(400).json({ message: 'Unable to create user' });
            return;
        }

        // success
        const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1d' });
        res.cookie(authCookieName, token, {
            maxAge: authCookieExpiry,
            httpOnly: true,
            secure: true,
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};