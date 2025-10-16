import { config } from "dotenv";

config();

export const envs={
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    publicPath: process.env.PUBLIC_PATH,
    jwtSecret: process.env.JWT_SECRET

}