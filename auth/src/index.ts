import express, { Request, Response } from "express";

// Create Express app
const app = express();
const PORT = process.env.PORT || 3008;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
