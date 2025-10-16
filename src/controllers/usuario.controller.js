import { usuarios } from "../models/usuarios.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { envs } from "../config/env.js";

const { jwtSecret} = envs

const generarToken = (usuario)=>{
    return jwt.sign(
        {id: usuario._id, email: usuario._email },
        jwtSecret,
        {expiresIn: "1h"}
    )
}

export const listarUsuario = async(req, res) =>{
    try{
        const usuario = await usuarios.find()

        if(usuario.length===0) return res.status(400).json({message: 'No se encontraron usuarios'})
        
            await res.json(usuario)
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const registrarUsuario = async(req, res)=>{
    try{
        const {nombre, correo, password} = req.body

        const exist = await usuarios.findOne({correo})

        if(exist) return res.status(400).json({message: 'El usuario ya existe'})

        const nuevoUsuario = new usuarios({
            nombre,
            correo,
            password
        })

        await nuevoUsuario.save()

        res.status(201).json({message: 'Usuario registrado correctamente'})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const login = async(req, res) =>{
    try{
        const {correo, password} = req.body;        
        const usuario = await usuarios.findOne({correo});
        
        if(!usuario) return res.status(400).json({message: 'El usuario no existe' })
        
        const passwordValido = await bcrypt.compare(password, usuario.password)

        if(!passwordValido) res.status(401).json({message: 'Contraseña Incorrecta'})

        const token = generarToken(usuario)

        res.json({message: "Inicio de sesion exitoso", token})

    }catch(error){
        console.error('Error en el login:', error);
        res.status(500).json({message: 'Error en el servidor'});
    }
}

export const validarToken = async(req, res)=>{
    try{
        const autHeader = req.headers.authorization;

        if(!autHeader)return res.status(401).json({message: 'Token requerido'})
        
        const token = autHeader.split(" ")[1];
        const decode = jwt.verify(token, jwtSecret)

        res.json({message: "Token valido", usuarios:decode})
    }catch(error){
        res.status(401).json({message: error.message})
    }
}
