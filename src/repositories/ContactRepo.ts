import { v7 } from "uuid";
import { User } from "../models/user.js";
let mock: User[] = [
  {
    id: v7(),
    name: "filipe",
    email: "teste1@gmail.com",
    phone: "230320420424",
    category_id: v7(),
  },
  {
    id: v7(),
    name: "belin",
    email: "teste2@gmail.com",
    phone: "23032042042444",
    category_id: v7(),
  },
];

class ContactRepo {
  async findAll() {
    return new Promise((resolve) => {
      resolve(mock);
    });
  }

  async findById(id: string) {
    return new Promise((resolve) => {
      const contact = mock.find((contact) => contact.id === id);
      resolve(contact);
    });
  }

  async create({ name, email, category_id, phone }: Omit<User, "id">) {
    return new Promise((resolve) => {
      const newContact: User = { id: v7(), name, email, category_id, phone };
      mock.push(newContact);
      resolve(newContact);
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return new Promise((resolve) => {
      const contact = mock.find((contact) => contact.email === email);
      resolve(contact);
    });
  }

  async update(id, updatedFields: User): Promise<User> {
    return new Promise((resolve) => {
      mock = mock.map((contact) =>
        contact.id === id ? { ...contact, ...updatedFields } : contact
      );
      const updatedContact = mock.find((contact) => contact.id === id)!;
      resolve(updatedContact);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      mock = mock.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

export const contactRepo = new ContactRepo();
