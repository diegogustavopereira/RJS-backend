import express from "express";
import CourtInformationModel from "../models/courtInformations.model.js";
import BeneficiaryHealthPlanModel from "../models/beneficiaryHelthPlan.model.js";
import HealthPlanModel from "../models/healthPlan.model.js";

const router = express.Router();

// GET
router.get("/", async (request, response) => {
    try {
        const courtInformation = await CourtInformationModel.find().populate("drugs");
        return response.status(200).json(courtInformation);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// GET BY ID
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const getCourtInformationById = await CourtInformationModel.findById(id);
        
        if(!getCourtInformationById) {
            return response.status(404).json({msg: "Processo não encontrado."});
        }
        return response.status(200).json(getCourtInformationById);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// GET BY AUTOR
router.get("/autor/:idprocess", async (request, response) => {

    let cobranca = {
        lawsuitNumber: "",
        cpfperson: "",
        namePerson: "",
        healthPlanName: "",
        healthPlanNameCnpj: "",
        drugs: [],
        total: ""
    }

    const { idprocess } = request.params;

    const process = await CourtInformationModel.findById(idprocess)
    cobranca.lawsuitNumber = process.lawsuitNumber;
    cobranca.drugs = process.drugs;
    
    let cpf = "";
    let namecpf = "";

    process.persons.forEach(person => {
        if (person.position === "Autor(a)"){
            cpf = person.cpfCnpj;
            namecpf = person.name;
        }
    });

    cobranca.cpfperson = cpf;
    cobranca.namePerson = namecpf;

const helthperson = await BeneficiaryHealthPlanModel.findOne({CPF: cpf}).populate("healthPlan")
console.log(helthperson);

cobranca.healthPlanName = helthperson.healthPlan.name;
cobranca.healthPlanNameCnpj = helthperson.healthPlan.CNPJ;

cobranca.total = cobranca.drugs.reduce((acc, currentValue) => {
    return acc + (currentValue.amount * currentValue.price)
}, 0
)

console.log(cobranca);

return response.status(200).json(cobranca);


    // try {
    //     const { cpf } = request.params;
    //     const getCourtInformationById = await CourtInformationModel.findOne({'persons.cpfCnpj': cpf});
        
    //     if(!getCourtInformationById) {
    //         return response.status(404).json({msg: "Processo não encontrado."});
    //     }
    //     return response.status(200).json(getCourtInformationById);

    // } catch (error) {
    //     console.log(error);
    //     return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    // }
});



// POST
router.post("/create", async (request, response) => {
    try {
        const createNew = await CourtInformationModel.create({...request.body});
        return response.status(200).json(createNew);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// PUT
router.put("/edit/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const updateCourtInformation = await CourtInformationModel.findByIdAndUpdate(id, {...request.body}, {new: true, runValidators: true});
        
        if (!updateCourtInformation) {
            return response.status(404).json({msg: "Processo não encontrado."});
        }
        return response.status(200).json(updateCourtInformation);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// DELETE
router.delete("/delete/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteCourtInformation = await CourtInformationModel.findByIdAndDelete(id);
        
        if (!deleteCourtInformation) {
            return response.status(404).json({msg: "Processo não encontrado."})
        }
        return response.status(204).json(deleteCourtInformation);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

export default router;
