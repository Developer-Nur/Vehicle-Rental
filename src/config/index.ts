import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  connection_srt: process.env.CONNECTION_SRT,
  port: process.env.PORT,
  jwt_token: process.env.JWT_TOKEN,
};

export default config;
