import { model, Schema } from "mongoose";

const CIDSchema = new Schema({
	CID: {
		type: String,
		required: true, //obrigatório
	},
	disease: 
		{
			type: String,
			required: true,
		},
	
});

//nome da tabela a ser utilizada, estrutura dos dados
const CidModel = model("CID", CIDSchema);

export default CidModel;
