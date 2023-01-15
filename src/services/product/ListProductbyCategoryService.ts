import prismaClient from "../../prisma";

interface ProductbyCategoryRequest {
  category_id: string;
}

class ListProductbyCategoryService {
  async execute({ category_id }: ProductbyCategoryRequest) {
    const list = await prismaClient.product.findMany({
      where: {
        category_id: category_id,
      },
    });

    return list;
  }
}

export { ListProductbyCategoryService };
