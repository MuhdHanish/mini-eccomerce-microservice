import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  protect,
  NotFoundError,
  isOwner,
  isAdmin,
} from "@hpshops/common";
import { natsWrapper } from "../nats-wrapper";
import { Product } from "../models/products";

const router = express.Router();

router.delete(
  "/api/admin/product/:productId",

  protect,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const product = await Product.findByIdAndDelete(productId);

      if (!product) throw new NotFoundError();

      res.json({message: "PRODUCT DELETED"});
    } catch (error) {
      res.status(500).json(error)
    }
  }
);

export { router as deleteProductRouter };
