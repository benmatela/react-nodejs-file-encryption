import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Initialize .env variables
dotenv.config();

// Create App
const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});