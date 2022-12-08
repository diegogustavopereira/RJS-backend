import express from "express";
import * as dotenv from "dotenv";
import dbConnect from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

dbConnect();

const app = express();

app.use(express.json());

app.use("/user", userRouter);


app.listen(Number(process.env.PORT), () => {
    console.log(`App up and running on port: ${process.env.PORT}`);
});
