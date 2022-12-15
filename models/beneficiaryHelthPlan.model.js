import { model, Schema } from "mongoose"

const BeneficiaryHealthPlanSchema = new Schema(
    {
        name: {
            type: String,
            required: true, //obrigatório
        },
        CPF: {
            type: String,
            required: true, //obrigatório
            trim: true, //vai aparar eventual espaço antes e depois do e-mail informado
            match: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/ 
        },
        healthPlan: {
            type: String,
        }
    }
)

                       //nome da tabela a ser utilizada, estrutura dos dados
const BeneficiaryHealthPlanModel = model("BeneficiaryHealthPlan", BeneficiaryHealthPlanSchema)

export default BeneficiaryHealthPlanModel