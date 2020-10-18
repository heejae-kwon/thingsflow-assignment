import express from "express";
import contentRouter from "./content";

const router = express.Router();

router.use("/content", contentRouter);

export default router;
