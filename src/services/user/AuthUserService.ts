import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // verifica se email existe
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) throw new Error("email or password incorrect");

    // verifica o password
    const passwordMath = await compare(password, user.password);
    if (!passwordMath) throw new Error("email or password incorrect");

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    return { id: user.id, name: user.name, email: user.email, token };
  }
}

export { AuthUserService };
