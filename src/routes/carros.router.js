import express from 'express'
import { obtenerCarros, crearCarro, actualizarCarro, eliminarCarro } from '../controllers/carros.controller.js'

const routerCarro = express.Router()


routerCarro.get('/', obtenerCarros)
routerCarro.post('/', crearCarro)
routerCarro.patch('/:id', actualizarCarro)
routerCarro.delete('/:id', eliminarCarro)

export default routerCarro