import express from "express";
import { AccountBlock, AccountUnblock, Adduser, RemoveUser, SearchUser } from "../Controller/userControl.js";

const router = express.Router();



router.post("/adduser", Adduser);

router.get("/search_user", SearchUser);

router.delete("/removeuser", RemoveUser);

router.put("/accountblock", AccountBlock);

router.put("/accountunblock", AccountUnblock);

export {router as userRouter};