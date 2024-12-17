import { v7 } from "uuid";
let mock = [
  {
    id: v7(),
    name: "filipe",
  },
  {
    id: v7(),
    name: "belin",
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

  async delete(id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      mock = mock.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

export const contactRepo = new ContactRepo();
