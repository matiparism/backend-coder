import dotenv from 'dotenv';
dotenv.config();

export default {
  JWT_SECRET: process.env.JWT_SECRET,
  COOKIEPASS: process.env.COOKIEPASS,
  SERVER_HOST: process.env.SERVER_HOST,
  SERVER_PORT: process.env.SERVER_PORT,
}