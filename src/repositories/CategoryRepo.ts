import { database } from "../database/index.js";

class CategoryRepo {
  async findAll() {
    const row = await database.query(`
      SELECT * FROM categories
      `);
    return row;
  }

  async findById(id: string) {
    const [row] = await database.query(
      `SELECT * FROM categories WHERE id = $1`,
      [id]
    );

    return row;
  }

  async create(name: string) {
    const [row] = await database.query(
      `
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
      `,
      [name]
    );

    return row;
  }

  async update(name: string, id: string) {
    const [row] = await database.query(
      `
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
      `,
      [name, id]
    );
    return row;
  }

  async delete(id: string) {
    await database.query("DELETE FROM categories WHERE ID = $1", [id]);
  }
}

export const categoryRepo = new CategoryRepo();
