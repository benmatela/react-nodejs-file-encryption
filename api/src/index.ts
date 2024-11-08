import express, { Express, Request, Response } from "express";
import loggingUtil from "./utils/logging.util";
import cors from "cors";
import { HTTP_STATUS_CODE } from "./models/enums/http-status-code.enum";
import { IHttpResponseWrapper } from "./models/http-response-wrapper.model";
import encryptionRoutes from './routes/encryption.route';
import configs from "./utils/configs.util";

const NAMESPACE = "SERVER";

// Create App
const app: Express = express();
const port = configs.server.port;

// Parse the body of the request
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json());
// Enable CORS
app.use(cors());

// Rules for our API
app.use((req: Request, res: any, next) => {
  // Allowed Origin
  res.header("Access-Control-Allow-Origin", '*');
  // Allowed Headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Multipart/Form-Data"
  );

  // The OPTIONS HTTP method requests permitted communication options for a given URL or server.
  if (req.method == "OPTIONS") {
    // Allowed HTTP methods
    const allowedMethods = "PUT, POST, PATCH, DELETE, GET";
    res.header("Access-Control-Allow-Methods", allowedMethods);

    const response: IHttpResponseWrapper<any> = {
      data: {},
      currentPage: 0,
      status: HTTP_STATUS_CODE.OK,
      success: true,
      message: allowedMethods,
      totalPages: 0,
      totalRecords: 0,
      errors: []
    }
    return res.status(response.status).json(response);
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

// Default API response
app.get("/", (req: Request, res: Response) => {
  res.send("NodeJs Encryption API");
});

// API Routes
app.use('/api/v1/encryption', encryptionRoutes);

// Handle invalid URLs
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
  loggingUtil.info(NAMESPACE, `Server is running at http://${configs.server.hostname}:${port}`);
});