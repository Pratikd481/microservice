import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            currentUser?: any;
        }
    }
}


export const currentUser = (req: Request, res: Response, next: NextFunction) => {

    const sessionjwt = req.session?.jwt;

    let user;
    try {
        var decoded = jwt.verify(sessionjwt, process.env.JWT_KEY!);
        user = decoded;
    } catch (error) {
        user = null
    }

    req.currentUser = user;
    next();
};
