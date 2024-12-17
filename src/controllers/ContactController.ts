import { Request, Response } from "express";
import { contactRepo } from "../repositories/ContactRepo.js";

class ContactController {
  async index(request: Request, response: Response): Promise<any> {
    const contacts = await contactRepo.findAll();
    response.json(contacts);
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const contact = await contactRepo.findById(id);
    if (!contact) {
      return response.status(404).json({ message: "user not found" });
    }
    response.json(contact);
  }

  store() {}

  update() {}

  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const contact = await contactRepo.findById(id);
    if (!contact) {
      return response.status(404).json({ message: "user not found" });
    }
    await contactRepo.delete(id);
    response.sendStatus(204);
  }
}

export const contactController = new ContactController();
