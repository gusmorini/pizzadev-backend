import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (!name) {
      throw new Error("name invalid");
    }

    const lowerName = name.toLowerCase();

    const categoryExists = await prismaClient.category.findFirst({
      where: { name: lowerName },
    });

    if (categoryExists) {
      throw new Error("category is already");
    }

    const category = await prismaClient.category.create({
      data: {
        name: lowerName,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
