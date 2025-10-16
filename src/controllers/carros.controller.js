import { carros } from "../models/carros.js";

export const obtenerCarros = async(req , res)=>{
    try{
        const carro = await carros.find()
        if(carro.length === 0){
               return res.status(204).json({
                    message: 'No se encontraron carros en la base de datos'
               })
        }

        return res.json(carro)
         
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

export const crearCarro = async(req, res) =>{
    try{
        const {marca, tipo, modelo, referencia, precio, stock} = req.body

        if(!marca || !tipo || !modelo || !referencia || !precio || !stock){
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            })
        }

        const carro = new carros({
            marca, tipo, modelo, referencia, precio, stock
        })

        const carroNuevo = await carro.save()
        return res.status(201).json({
            message: 'El carro fue creado',
            data: carroNuevo
        })

    }catch(error){
        return res.status(400).json({
            message: error.message
        })
    }
}

export const actualizarCarro = async (req, res)=>{
    try{
        const updateCar = await carros.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(updateCar)
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const eliminarCarro = async (req, res)=>{
    try{
        const elimCar = await carros.findByIdAndDelete(req.params.id)
        res.status(204).json({
            message: "carro eliminado correctamente",
            data:eliminarCarro
        })
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
