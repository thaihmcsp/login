import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import * as path from "path";
import IndexRoute from "./routes/index.route";
import cors from "cors";

const Port = process.env.PORT;
const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/publics", express.static(path.join(__dirname, "./publics")));

app.use("/", IndexRoute);

app.use("*", (req: Request, res: Response) => {
  res.json("error 404. page not found");
});

app.listen(Port, async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/loginDB");
  console.log("DB connected");
  console.log(`http://localhost:${Port}/`);
});
