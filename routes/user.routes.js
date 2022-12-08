import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import generateToken from "../config/jwt.config.js";

const router = express.Router();
const rounds = 10;

// CRIAR USUÁRIO
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

// FAZER LOGIN
router.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await UserModel.findOne({ email: email});

        if(!user) {
            return response.status(400).json({msg: "Erro nos dados de autenticação."});
        }

        if(await bcrypt.compare(password, user.password)) {
            delete user._doc.password;
            const token = generateToken(user);
            return response.status(200).json({user: {...user._doc}, token: token});
        } else {
            return response.status(401).json({msg: "Erro nos dados de autenticação."});
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// GET USUÁRIO LOGADO
router.get("/profile", isAuth, attachCurrentUser, async (request, response) => {
    try {
        const loggedUser = request.currentUser;

        if(!user) {
            return response.status(404).json({msg: "Usuário não encontrado."})
        }

        const user = await UserModel.findById(loggedUser._id);
        delete user._doc.password;
        return response.status(200),json(user);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
})

export default router;
