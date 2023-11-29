import config from "../config.js";
import mongoose from "mongoose";
mongoose.set('strictQuery',false)
mongoose.connect(config.DB_CONECTION_URL).then(() => { console.log('Connection Successfull...') }).catch((err) => { console.log(err) })

export default mongoose