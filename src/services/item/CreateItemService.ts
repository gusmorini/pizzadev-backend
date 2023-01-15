import prismaClient from "../../prisma";

interface ItemRequest {
  amount: number;
  order_id: string;
  product_id: string;
}

export class CreateItemService {
  async execute({ amount, order_id, product_id }: ItemRequest) {
    const order = await prismaClient.order.findFirst({
      where: { id: order_id },
    });

    if (!order) {
      throw new Error("order not exists");
    }

    const product = await prismaClient.product.findFirst({
      where: { id: product_id },
    });

    if (!product) {
      throw new Error("product not exists");
    }

    const item = await prismaClient.item.create({
      data: {
        amount,
        order_id,
        product_id,
      },
    });

    return item;
  }
}
