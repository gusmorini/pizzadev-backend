import { Request, Response } from "express";
import { CreateItemService } from "../../services/item/CreateItemService";

export class CreateItemController {
  async handle(req: Request, res: Response) {
    const { amount, order_id, product_id } = req.body;
    const service = new CreateItemService();
    const item = await service.execute({ amount, order_id, product_id });
    return res.json(item);
  }
}
