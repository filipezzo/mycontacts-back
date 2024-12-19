import express from "express";
import "express-async-errors";
import { router } from "./routes/index.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}!`);
});
