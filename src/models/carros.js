import mongoose from "mongoose";

const carrosSchema = new mongoose.Schema({
    marca:{type:String , required:true},
    tipo:{type:String, required:true},
    modelo:{type:Number, required:true},
    referencia:{type:String, required:true},
    precio:{type:Number, required:true},
    stock:{type:Number, required:true}
})


export const carros = mongoose.model("cars", carrosSchema)