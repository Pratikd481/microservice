import express, { Request, Response } from "express";
import jwt from "jsonwebtoken"

const router = express.Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
    const sessionjwt = req.session?.jwt;

    let user;
    try {
        var decoded = jwt.verify(sessionjwt, process.env.JWT_KEY!);
        user = decoded;
    } catch (error) {
        user = null
    }

    res.status(200).send(user);
});

export { router as currentUserRoute };
