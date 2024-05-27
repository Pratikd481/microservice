import express, { Request, Response } from "express";
import { currentUserRoute } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signuptRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotfoundError } from "./errors/not-found-error";
// Create Express app
const app = express();
const PORT = process.env.PORT || 3008;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route
app.use(currentUserRoute);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signuptRouter);

app.all("", async () => {
    throw new NotfoundError();
});

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
