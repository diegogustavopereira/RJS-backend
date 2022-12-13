import express from "express";
import HealthPlanModel from "../models/healthPlan.model.js";

const router = express.Router();

// GET
router.get("/", async (request, response) => {
    try {
        const healthPlan = await HealthPlanModel.find();
        return response.status(200).json(healthPlan);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// GET BY ID
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const getHealthPlanById = await HealthPlanModel.findById(id);

        if(!getHealthPlanById) {
            return response.status(404).json({msg: "Plano de saúde não encontrado."})
        }
        return response.status(200).json(getHealthPlanById); 

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// POST
router.post("/create", async (request, response) => {
    try {
        const createNew = await HealthPlanModel.create({...request.body});
        return response.status(201).json(createNew);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
});

// PUT
router.put("/edit/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const updateHealthPlan = await HealthPlanModel.findByIdAndUpdate(id, {...request.body}, {new: true, runValidators: true});

        if(!updateHealthPlan) {
            return response.status(404).json({msg: "Plano de saúde não encontrado."})
        }
        return response.status(200).json(updateHealthPlan);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo."});
    }
});

// DELETE
router.delete("/delete/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteHealthPlan = await HealthPlanModel.findByIdAndDelete(id);

        if(!deleteHealthPlan) {
            return response.status(404).json({msg: "Plano de saúde não encontrado."})
        }
        return response.status(204).json(deleteHealthPlan);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo."});
    }
});

export default router;
