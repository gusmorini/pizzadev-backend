import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

export class DetailsOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.findFirst({
      where: { id: order_id },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        items: true,
      },
    });
    return order;
  }
}
