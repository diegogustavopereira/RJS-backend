import { model, Schema } from "mongoose"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true, //obrigatório
        },
        email: {
            type: String,
            required: true, //obrigatório
            unique: true, //único
            trim: true, //vai aparar eventual espaço antes e depois do e-mail informado
            match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm //mascara para e-mail
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['usuário', 'admin'],
            default: 'usuário'
        }
    }
)

                       //nome da tabela a ser utilizada, estrutura dos dados
const UserModel = model("User", userSchema)

export default UserModel