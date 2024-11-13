import express, { Request, Response } from "express";
import { body } from 'express-validator';
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post("/api/users/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password required"),
    ], validateRequest, async (req: Request, res: Response) => {


        //check if user exist
        const email = req.body.email;
        const password = req.body.password;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError("Invalid credentials");
        }

        //compare and validate password
        const matchedPassword = await Password.compare(existingUser.password, password);
        if (!matchedPassword) {
            throw new BadRequestError("Invalid credentials");
        }
        //generate jwt
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt,
        };

        //return user 
        res.status(200).send(existingUser);
    });

export { router as signinRouter };
