import { Router } from "express";
import { categoryController } from "../controllers/CategoryController.js";

export const categoriesRoutes = Router();

categoriesRoutes.get("/", categoryController.index);
categoriesRoutes.post("/", categoryController.store);
categoriesRoutes.get("/:id", categoryController.show);
categoriesRoutes.put("/:id", categoryController.update);
categoriesRoutes.delete("/:id", categoryController.delete);
