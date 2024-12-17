import { Router } from "express";
import { contactController } from "../controllers/ContactController.js";

export const contactRouter = Router();

contactRouter.get("/", contactController.index);
contactRouter.get("/:id", contactController.show);
contactRouter.delete("/:id", contactController.delete);
