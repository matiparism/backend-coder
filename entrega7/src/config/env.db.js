const DB_USER= process.env.DB_USER
const DB_PASSWORD= process.env.DB_PASSWORD
const DB_CLUSTER= process.env.DB_CLUSTER

export default {
  MONGO_URL : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}`
}