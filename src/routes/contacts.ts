import { Router } from "express";
import { contactController } from "../controllers/ContactController.js";

export const contactRouter = Router();

contactRouter.get("/", contactController.index);
contactRouter.post("/", contactController.store);
contactRouter.get("/:id", contactController.show);
contactRouter.put("/:id", contactController.update);
contactRouter.delete("/:id", contactController.delete);
