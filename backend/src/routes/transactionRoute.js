import express from "express";
import { getUserTransactions } from "../controllers/transactionController.js";

const router = express.Router();

router.get("/user/:id", getUserTransactions);

export default router;
