import express from "express";
import CourtInformationModel from "../models/courtInformations.model.js";

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
})

// POST
router.post("/create", async (request, response) => {
    try {
        const createNew = await CourtInformationModel.create({...request.body});
        return response.status(200).json(createNew);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo"});
    }
})

// PUT

// DELETE

export default router;