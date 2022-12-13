import express from "express";
import DrugsModel from "../models/drugs.model.js";

const router = express.Router();

// GET
router.get("/", async (request, response) => {
    try {
        const drug = await DrugsModel.find();
        return response.status(200).json(drug);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo."})
    }
});

// GET BY ID
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const getDrugById = await DrugsModel.findById(id);

        if(!getDrugById) {
            return response.status(404).json({msg: "Medicamento não encontrado."})
        }
        return response.status(200).json(getDrugById);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo."})
    }
});

// POST
router.post("/create", async (request, response) => {
    try {
        const newDrug = await DrugsModel.create({...request.body});
        return response.status(201).json(newDrug);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo."})
    }
})

// PUT
router.put("/edit/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const updateDrug = await DrugsModel.findByIdAndUpdate(id, {...request.body}, {new: true, runValidators: true});

        if(!updateDrug) {
            return response.status(404).json({msg: "Medicamento não encontrado."})
        };
        return response.status(200).json(updateDrug);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo."})
    }
});

// DELETE
router.delete("/delete/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteDrug = await DrugsModel.findByIdAndDelete(id);

        if(!deleteDrug) {
            return response.status(404).json("Medicamento não encontrado.")
        }
        return response.status(204).json(deleteDrug);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

export default router;
