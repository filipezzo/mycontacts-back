import { Router } from "express";
import { contactRouter } from "./contacts.js";

export const router = Router();

router.use("/contacts", contactRouter);
