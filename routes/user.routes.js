import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";

const router = express.Router();
const rounds = 10;

router.post("/register", async (request, response) => {
    try {
        const { password } = request.body;
        
        if(!password) {
            return response.status(400).json({ msg: "É necessário digitar a senha"})
        }

        const saltString = await bcrypt.genSalt(rounds); // bcrypt faz a string da senha
        const hashPassword = await bcrypt.hash(password, saltString); //cria a hash da senha

        const user = await UserModel.create({
            ...request.body,
            password: hashPassword,
        })

        delete user._doc.password; // protege a senha do usuário

        return response.status(201).json(user)

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
})

export default router;
