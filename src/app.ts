import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import * as path from "path";
import IndexRoute from "./routes/index.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getConfig } from "./configs/config";
const config = getConfig();

const Port = config.auth.port;
const app: Express = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/views", express.static(path.join(__dirname, "./views")));

app.use("/", IndexRoute);

app.use("*", (req: Request, res: Response) => {
  res.json("error 404. page not found");
});

app.listen(Port, async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/loginDB");
  console.log("DB connected");
  console.log(`http://localhost:${Port}/`);
});
