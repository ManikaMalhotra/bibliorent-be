import { Request, Response } from 'express';

export interface UserRequest extends Request {
    user?: {
        id: string;
    }
}

export interface UserResponse extends Response {
    user?: {
        id: string;
    }
}