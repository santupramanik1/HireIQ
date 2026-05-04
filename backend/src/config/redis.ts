// import {createClient} from "redis"

// export const redisClient=createClient({
//     url:process.env.REDIS_URL!
// })

// redisClient.on("error",(error)=>console.log("Redis error: ",error))
// redisClient.on("connect",()=>console.log("Redis connected"))

// export const connectRedis=async()=>{
//     try {
//         await redisClient.connect()
//     } catch (error) {
//         console.error("Could not connect to Redis", error);
//     }
// }
