import { model, Schema } from "mongoose"

const CourtInformationSchema = new Schema(
    {
        processNumber: {
            type: String,
            required: true, //obrigatório
            unique: true,
            trim: true, //vai aparar eventual espaço antes e depois do e-mail informado
            // match: /0000000-00\.0000\.0\.00\.0000/i 
        },
        beneficiaryCPF: {
            type: String,
            required: true, //obrigatório
            trim: true, //vai aparar eventual espaço antes e depois do e-mail informado
            match: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/ 
        },
        beneficiaryName: {
            type: String,
            required: true,
        },
        diseaseCID: {
            type: String,
            required: true,
            // match: /^.*?(?=[\+\^#%&$\*:<>\?/\{\|\}\[\]\\\)\(]).*$/g 
        },
        drugs: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        }
    }
)

                       //nome da tabela a ser utilizada, estrutura dos dados
const CourtInformationModel = model("CourtInformation", CourtInformationSchema)

export default CourtInformationModel