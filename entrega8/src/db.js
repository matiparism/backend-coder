import mongoose from "mongoose";

import db from './config/env.db.js'

mongoose.connect(db.MONGO_URL)
  .then(db => console.log('DB conected'))
  .catch(error => console.log(error))

export default db;