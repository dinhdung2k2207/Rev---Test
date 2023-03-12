/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express, { Express, Request, Response } from 'express';
import cors from "cors";
import methodOverride from "method-override";
import helmet from "helmet";
import { connectToDatabase } from "./configs/connectDB";
import { DB_CONN_STRING, HOST, PORT } from "./configs/constantEnv";
import router from "./routes";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app
  .use(helmet())
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .use(methodOverride())
  .use(bodyParser.json())
  .use("/api", router)

connectToDatabase(DB_CONN_STRING)
  .then(async () => {
    console.log("✅ Connected mongodb");

    app.listen(PORT, () => {
      console.log(`🛵 App running at ${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Connect to Mongodb Error", { err });
  })


app.get("/test", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
