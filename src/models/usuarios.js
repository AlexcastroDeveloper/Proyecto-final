import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs"

const usuariosSchema = new mongoose.Schema({
    nombre:{type:String, required: true},
    correo:{type:String, required: true},
    password:{type:String, required: true}
})

usuariosSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const cifrar = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, cifrar);
    next();
})

export const usuarios = mongoose.model('users', usuariosSchema)

