import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

export class ListOrderController {
  async handle(req: Request, res: Response) {
    const service = new ListOrderService();
    const orders = await service.execute();
    return res.json(orders);
  }
}
