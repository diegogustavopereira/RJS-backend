import Express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = Express();

app.use(Express.json());


app.listen(process.env.PORT, () => {
    console.log(`App up and running on port: ${process.env.PORT}`);
});
