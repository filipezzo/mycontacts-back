import { Request, Response } from "express";
import { contactRepo } from "../repositories/ContactRepo.js";

class ContactController {
  async index(request: Request, response: Response) {
    const { orderBy = "ASC" } = request.query;
    const contacts = await contactRepo.findAll(orderBy as string);
    response.json(contacts);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const contact = await contactRepo.findById(id);
    if (!contact) {
      return response.status(404).json({ message: "user not found" });
    }
    response.json(contact);
  }

  async store(request: Request, response: Response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: "name is required" });
    }

    const contactExists = await contactRepo.findByEmail(email);
    if (contactExists) {
      return response
        .status(400)
        .json({ error: "this email is already been taken" });
    }

    const contact = await contactRepo.create({
      name,
      email,
      phone,
      category_id,
    });
    response.status(201).json(contact);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, phone, category_id = null } = request.body;
    if (!name) {
      return response.status(400).json({ error: "name is required" });
    }
    const contact = await contactRepo.findById(id);

    if (!contact) {
      return response.status(404).json({ message: "user not found" });
    }

    const updateContact = await contactRepo.update({
      id,
      name,
      email,
      phone,
      category_id,
    });
    response.json(updateContact);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await contactRepo.delete(id);
    response.sendStatus(204);
  }
}

export const contactController = new ContactController();
