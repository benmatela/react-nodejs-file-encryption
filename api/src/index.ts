import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import loggingUtil from "./utils/logging.util";
import cors from "cors";
import http from "http";
import { HTTP_STATUS_CODE } from "./models/enums/http-status-code.enum";

const NAMESPACE = "SERVER";

// Initialize .env variables
dotenv.config();

// Create App
const app: Express = express();
const port = process.env.PORT || 3000;

// Parse the body of the request
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json());
app.use(cors());

// Rules for our API
app.use((req: Request, res: any, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Multipart/Form-Data"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Client info
app.use((req: Request, res: Response, next) => {
  loggingUtil.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    loggingUtil.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });
  next();
});

// API error handling
app.use((req: Request, res: Response) => {
  const error = new Error("Not found");
  res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
    message: error.message,
    status: HTTP_STATUS_CODE.NOT_FOUND,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});