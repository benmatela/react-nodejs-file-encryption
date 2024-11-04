import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import loggingUtil from "./utils/logging.util";
import cors from "cors";
import { HTTP_STATUS_CODE } from "./models/enums/http-status-code.enum";
import { IHttpResponseWrapper } from "./models/http-response-wrapper.model";

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

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Default API response
app.use((req: Request, res: Response) => {
  const response: IHttpResponseWrapper<any> = {
    data: {},
    currentPage: 0,
    status: HTTP_STATUS_CODE.NOT_FOUND,
    success: false,
    message: "Not found",
    totalPages: 0,
    totalRecords: 0,
    errors: ["Not found"]
  }
  res.status(HTTP_STATUS_CODE.NOT_FOUND).json(response);
});

// Start server
app.listen(port, () => {
  loggingUtil.info(NAMESPACE, `Server is running at http://localhost:${port}`);
});