import config from "./config.js";
import connection from './connection/dbcon.js'
import express from "express";
import { fileURLToPath } from 'url';
import path from "path";
import cors from 'cors'
import upload from 'express-fileupload'
import webRouter from './router/web.js'
import apiRouter from './router/api.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(upload())

app.use(cors())
app.options('*', cors())

app.use("/", webRouter)
app.use("/api", apiRouter)

app.use(express.static('../Client/build'))
app.get("*", (req, res) => {
    res.sendFile(path.resolve('../Client/build', 'index.html'))
})

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})