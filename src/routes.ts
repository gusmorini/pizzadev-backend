import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductbyCategoryController } from "./controllers/product/ListProductbyCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";

import { CreateItemController } from "./controllers/item/CreateItemController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// --- USER ROUTES
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

// --- CATEGORY ROUTES
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

// --- PRODUCT ROUTES

router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/product/:category_id",
  isAuthenticated,
  new ListProductbyCategoryController().handle
);

// --- ORDER ROUTES
router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.get("/order", isAuthenticated, new ListOrderController().handle);
router.delete(
  "/order/:order_id",
  isAuthenticated,
  new DeleteOrderController().handle
);

// --- ITEM ROUTES
router.post("/item", isAuthenticated, new CreateItemController().handle);

export { router };
