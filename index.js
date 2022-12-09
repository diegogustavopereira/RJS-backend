import express from "express";
import * as dotenv from "dotenv";
import dbConnect from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import courtInformationsRouter from "./routes/courtInformations.routes.js"
import cors from "cors";

dotenv.config();

dbConnect();

const app = express();
app.use(cors({origin: process.env.REACT_URL}));
app.use(express.json());

app.use("/user", userRouter);
app.use("court-informations", courtInformationsRouter);


app.listen(Number(process.env.PORT), () => {
    console.log(`App up and running on port: ${process.env.PORT}`);
});
