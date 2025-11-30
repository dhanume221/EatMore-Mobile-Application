import express from "express";
import dotenv from "dotenv";

import ratelimit from "./middleware/ratelimiter.js";
import {userRouter} from "./Router/userRouter.js";
import {timeRouter} from "./Router/timeRouter.js";

dotenv.config();

const app = express();
const Port = process.env.PORT || 4545;
//middleware
app.use(ratelimit);
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/timenow",timeRouter);

app.listen(Port, () => {
    console.log("Server is running on Port:", Port);
})


app.get("/", (req, res) => {
    try {
        res.send("API working!");
    }
    catch (err) {
        res.json(err.message);
    }
})
