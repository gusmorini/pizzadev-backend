import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

export class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.params.order_id as string;
    const service = new DeleteOrderService();
    const order = await service.execute({ order_id });
    return res.json(order);
  }
}
