import prismaClient from "../../prisma";

interface OrderRequest {
  table: number;
  name?: string;
}

export class CreateOrderService {
  async execute({ table, name }: OrderRequest) {
    const tableExists = await prismaClient.order.findFirst({
      where: {
        table: table,
      },
    });

    if (tableExists) {
      throw new Error("the table has already been opened");
    }

    const order = await prismaClient.order.create({
      data: {
        table,
        name,
      },
    });

    return order;
  }
}
