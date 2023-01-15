import { Request, Response } from "express";
import { DetailsOrderService } from "../../services/order/DetailsOrderService";

export class DetailOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.params.order_id as string;
    const service = new DetailsOrderService();
    const order = await service.execute({ order_id });
    return res.json(order);
  }
}
