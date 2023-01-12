import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "server online" });
});

router.get("/test", (req: Request, res: Response) => {
  return res.json({ message: "route test" });
});

export { router };
