import express from "express";
import * as dotenv from "dotenv";
import dbConnect from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import courtInformationRouter from "./routes/courtInformations.routes.js";
import healthPlanRouter from "./routes/healthPlan.routes.js";
import beneficiaryRouter from "./routes/beneficiaryHelthPlan.routes.js";
import drugsRouter from "./routes/drugs.routes.js";
import cidRouter from "./routes/cid.routes.js";
import cors from "cors";

dotenv.config();

dbConnect();

const app = express();

// app.use(cors({origin: process.env.REACT_URL}));

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/court-information", courtInformationRouter);
app.use("/health-plan", healthPlanRouter);
app.use("/beneficiary", beneficiaryRouter);
app.use("/drug", drugsRouter);
app.use("/cid", cidRouter);

app.listen(Number(process.env.PORT), () => {
    console.log(`App up and running on port: ${process.env.PORT}`);
});
