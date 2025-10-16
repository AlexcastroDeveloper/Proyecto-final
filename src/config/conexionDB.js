import {envs} from './env.js'
import mongoose from 'mongoose'

export const iniciarDB = async () =>{
    try{
        const {mongoUri} = envs
        await mongoose.connect(mongoUri)
        console.log('Se conecto a la base de datos')
    }catch(error){
        console.log('no se puedo conectar a la base de datos'+ error)
    }

}