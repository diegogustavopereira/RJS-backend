import express from "express";
import BeneficiaryHealthPlanModel from "../models/beneficiaryHelthPlan.model.js"

const router = express.Router();

//GET
router.get("/", async (request, response) => {
    try {
        const beneficiary = await BeneficiaryHealthPlanModel.find();
        return response.status(200).json(beneficiary);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// GET BY ID
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const getBeneficiaryById = await BeneficiaryHealthPlanModel.findById(id);

        if(!getBeneficiaryById) {
            return response.status(404).json({msg: "Beneficiário não encontrado."})
        }
        return response.status(200).json(getBeneficiaryById);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// POST
router.post("/create", async (request, response) => {
    try {
        const newBeneficiary = await BeneficiaryHealthPlanModel.create({...request.body});
        return response.status(201).json(newBeneficiary);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não esté certo."})
    }
});

// PUT
router.put("/edit/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const updateBeneficiary = await BeneficiaryHealthPlanModel.findByIdAndUpdate(id, {...request.body}, {new: true, runValidators: true});

        if(!updateBeneficiary) {
            return response.status(404).json({msg: "Beneficiário não encontrado."})
        }
        return response.status(200).json(updateBeneficiary);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo."})
    }
});

// DELETE
router.delete("/delete/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteBeneficiary = await BeneficiaryHealthPlanModel.findByIdAndDelete(id);
        
        if(!deleteBeneficiary) {
            return response.status(404).json({msg: "Beneficiário não encontrado."})
        }
        return response.status(204).json(deleteBeneficiary);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo."})
    }
});

export default router;
