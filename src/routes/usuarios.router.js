import express from 'express'
import { registrarUsuario, login, validarToken , listarUsuario} from '../controllers/usuario.controller.js'

const routerUsuario = express.Router()

routerUsuario.post('/login', login);
routerUsuario.get('/', listarUsuario)
routerUsuario.post('/', registrarUsuario)


export default routerUsuario