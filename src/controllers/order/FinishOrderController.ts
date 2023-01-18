import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

export class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;
    const service = new FinishOrderService();
    const order = await service.execute({ order_id });
    return res.json(order);
  }
}
