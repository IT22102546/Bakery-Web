import express from "express";
import { getCategories, getSearch } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/products", getSearch);
router.get("/categories", getCategories);

export default router;
