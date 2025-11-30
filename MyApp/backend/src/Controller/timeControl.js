import client from "../config/db.js";
import moment from "moment-timezone";

export async function GetTime(req,res) {
    try {
        const result = await client.query("SELECT NOW();");
        const utcTime = result.rows[0].now;
        const istTime = moment(utcTime).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mm:ss A');
        res.json({ message: 'Get Time from Database', time: istTime, result: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
}
    