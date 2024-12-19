import { database } from "../database/index.js";
import { User } from "../models/user.js";

class ContactRepo {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await database.query(
      `SELECT * FROM contacts ORDER BY name ${direction};`
    );
    return rows;
  }

  async findById(id: string) {
    const [row] = await database.query(`SELECT * FROM contacts WHERE id = $1`, [
      id,
    ]);
    return row;
  }

  async create({ name, email, category_id, phone }: Omit<User, "id">) {
    const [row] = await database.query(
      `
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, phone, category_id]
    );

    return row;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [row] = await database.query(
      `SELECT * FROM contacts WHERE email = $1`,
      [email]
    );
    return row;
  }

  async update({ name, email, phone, id, category_id }: User): Promise<User> {
    const [row] = await database.query(
      `
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
      `,
      [name, email, phone, category_id, id]
    );
    return row;
  }

  async delete(id: string): Promise<void> {
    await database.query(
      `
      DELETE FROM contacts
      WHERE id = $1
      `,
      [id]
    );
  }
}

export const contactRepo = new ContactRepo();
