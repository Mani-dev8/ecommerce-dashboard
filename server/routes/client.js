import express from "express";
import { getCustomers, getProducts, getTransactions, getGeography } from "../controllers/client.js";

const router = express.Router()

router.get('/product/all', getProducts)
router.get('/customer/all', getCustomers)
router.get('/transaction/all', getTransactions)
router.get('/geography', getGeography)
export default router;