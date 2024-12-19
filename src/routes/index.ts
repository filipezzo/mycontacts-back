import { Router } from "express";
import { categoriesRoutes } from "./categories.js";
import { contactRouter } from "./contacts.js";

export const router = Router();

router.use("/contacts", contactRouter);
router.use("/categories", categoriesRoutes);
