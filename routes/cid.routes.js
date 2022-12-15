import express from "express";
import CidModel from "../models/cid.model.js";

const router = express.Router();

// GET
router.get("/", async (request, response) => {
    try {
        const cid = await CidModel.find();
        return response.status(200).json(cid);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Ops... algo de errado não está certo."})
    }
});

export default router;