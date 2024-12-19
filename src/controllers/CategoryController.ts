import { Request, Response } from "express";
import { categoryRepo } from "../repositories/CategoryRepo.js";

class CategoryController {
  async index(request: Request, response: Response) {
    const data = await categoryRepo.findAll();
    response.json(data);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({ error: "category not found." });
    }
    const category = await categoryRepo.findById(id);
    response.json(category);
  }
  async store(request: Request, response: Response) {
    const { name } = request.body;
    if (!name) {
      response.status(401).json({ error: "Bad request" });
      return;
    }
    const category = await categoryRepo.create(name);

    response.status(201).json(category);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name || !id) {
      response.status(400).json({ message: "bad request" });
    }

    const category = await categoryRepo.update(name, id);

    response.json(category);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) {
      response.status(400).json({ message: "bad request" });
    }
    await categoryRepo.delete(id);
    response.sendStatus(204);
  }
}

export const categoryController = new CategoryController();
