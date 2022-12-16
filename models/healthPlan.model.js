import { model, Schema } from "mongoose"

const HealthPlanSchema = new Schema(
    {
        name: {
            type: String,
            required: true, //obrigatório
        },
        CNPJ: {
            type: String,
            required: true, //obrigatório
            trim: true, //vai aparar eventual espaço antes e depois do e-mail informado
            // match: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/ 
        }
    }
)

                       //nome da tabela a ser utilizada, estrutura dos dados
const HealthPlanModel = model("HealthPlan", HealthPlanSchema)

export default HealthPlanModel