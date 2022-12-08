import UserModel from "../models/user.model.js";

async function attachCurrentUser(request, response, next) {
    try {
        const loggedUser = request.auth;
        const user = await UserModel.findOne({ _id: loggedUser._id });

        if(!user) {
            response.status(400).json({msg: "O usuário informado não existe."});
        }
        
        request.currentUser = user;
        next();

    } catch (error) {
        console.log(error);
        response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
}

export default attachCurrentUser;
