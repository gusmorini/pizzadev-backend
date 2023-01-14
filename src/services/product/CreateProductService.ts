import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: ProductRequest) {
    const productExists = await prismaClient.product.findFirst({
      where: {
        name: name.toLowerCase(),
      },
    });

    if (productExists) {
      throw new Error("product is already");
    }

    const product = await prismaClient.product.create({
      data: {
        name: name.toLocaleLowerCase(),
        price,
        description,
        banner,
        category_id,
      },
    });

    return product;
  }
}

export { CreateProductService };
