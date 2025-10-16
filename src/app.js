import mongoose from "mongoose";
import express from 'express';
import routerCarro from "./routes/carros.router.js";
import routerUsuario from "./routes/usuarios.router.js";
import bodyParser from "body-parser";
import { iniciarDB } from "./config/conexionDB.js";
import { iniciarServer } from "./config/server.js";


const app = express()

app.use(bodyParser.json())

app.use('/cars', routerCarro)
app.use('/users', routerUsuario)

iniciarDB()

iniciarServer(app)


