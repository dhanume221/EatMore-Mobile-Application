import express from "express";
import { GetTime } from "../Controller/timeControl.js";

const router = express.Router();



router.get("/now", GetTime);

export { router as timeRouter };
