import { Request, Response } from "express";
import { ListProductbyCategoryService } from "../../services/product/ListProductbyCategoryService";

class ListProductbyCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;
    const service = new ListProductbyCategoryService();
    const list = await service.execute({ category_id });
    return res.json(list);
  }
}

export { ListProductbyCategoryController };
