import express, { Express, Request, Response } from "express";
import registerRouter from "./register/registerRouter";
import searchRouter from "./search/searchRouter";
import mintRouter from "./mint/mintRouter";
import dotenv from "dotenv";
import cors  from "cors";

// ... other middleware ...

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // or an array of allowed origins like ['http://localhost:3000', 'https://www.example.com']
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers,
  credentials: true, // Allow cookies, if needed.
  maxAge: 3600 // Preflight cache duration.
};


dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3002;


app.use(express.json());
app.use(cors(corsOptions));

app.use("/mint", mintRouter);
app.use("/register", registerRouter);
app.use("/search", searchRouter);



export default app;
