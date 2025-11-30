import ratelimiter from "../config/upstash.js";

const ratelimit = async (req, res, next) => {
    try {
        const key = 'my-key';
        const { success } = await ratelimiter.limit(key);


        if (!success) {
            return res.status(429).json({ message: "Too many requests, Please try again later." })
        }

        next();
    } catch (error) {
        console.log("Rate limit error", error)
        next(error);
    }
};


export default ratelimit