import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
    res.send("Hello, world! new");
});

export { router as currentUserRoute };
