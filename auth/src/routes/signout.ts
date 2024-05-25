import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
    res.send("Hello, world! 3");
});

export { router as signoutRouter };
