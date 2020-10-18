import path from "path";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "../.env.production") });
} else if (process.env.NODE_ENV === "develop") {
  dotenv.config({ path: path.join(__dirname, "../.env.develop") });
} else {
  throw new Error("process.env.NODE_ENV를 설정하지 않았습니다!");
}

export default {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB: process.env.DB,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
};
