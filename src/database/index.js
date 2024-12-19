import pg from "pg";
const client = new pg.Client({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "root",
  database: "mycontacts",
});
client.connect();

async function query(q, values) {
  const { rows } = await client.query(q, values);
  return rows;
}

export const database = {
  query,
};
