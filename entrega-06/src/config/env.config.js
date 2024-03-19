import dotenv from 'dotenv';
dotenv.config();

const DB_USER= process.env.DB_USER
const DB_PASSWORD= process.env.DB_PASSWORD
const DB_CLUSTER= process.env.DB_CLUSTER

export default {
  JWT_SECRET: process.env.JWT_SECRET,
  COOKIEPASS: process.env.COOKIEPASS,
  SERVER_PORT: process.env.SERVER_PORT,

  MONGO_URL : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}`
}