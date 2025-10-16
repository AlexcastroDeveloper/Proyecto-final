import { envs } from "./env.js";
import path, {dirname} from 'path'
import { fileURLToPath } from "url";
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export const iniciarServer = (app)=>{
    const {port, publicPath} = envs

    app.use(express.static(publicPath))
    app.get('/', async( req , res)=>{
        const indexPath = path.join(__dirname + `../../${publicPath}/index.html`)
        res.sendFile(indexPath)
    })

    app.listen(port, ()=>{
        console.log(`El servidor esta escuchando por el puerto ${port}`)
    })
} 