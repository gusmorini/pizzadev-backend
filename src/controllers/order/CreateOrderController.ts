import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table, name } = req.body;
    const service = new CreateOrderService();
    const order = await service.execute({ table, name });
    return res.json(order);
  }
}
