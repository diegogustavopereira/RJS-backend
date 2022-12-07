import { model, Schema } from "mongoose"

const DrugsSchema = new Schema(
    {
        name: {
            type: String,
            required: true, //obrigatório
        },
        places: [
            {
                place: {
                    type: String,
                },
                recommendation: {
                    type: String,
                }
            }
        ],
        CID: [
            {
                type: String
            }
        ]
    }
)

                       //nome da tabela a ser utilizada, estrutura dos dados
const DrugsModel = model("Drug", DrugsSchema)

export default DrugsModel