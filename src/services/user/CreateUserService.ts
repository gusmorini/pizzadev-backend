import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    // dados inválidos
    if (!email || !name || !password)
      throw new Error("invalid mandatory fields");

    // email já cadastrado
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });
    if (userAlreadyExists) throw new Error("Email already exists");

    const passwordHash = await hash(password, 8);

    // cria usuario
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
