import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

export class TokenController {
  async handle(request, response) {
    const { email = '', password = '' } = request.body;
    const prisma = new PrismaClient();

    if (!email || !password) {
      return response.status(400).json({
        errors: ['Credenciais inválidas'],
      });
    }

    try {
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        return response.status(400).json({
          errors: ['Usuário inexistente'],
        });
      }

      if (!bcryptjs.compareSync(password, user.password)) {
        return response.status(401).json({
          errors: ['Senha inválida'],
        });
      }

      const { id, name } = user;

      const token = jwt.sign({ id, name, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return response.json({ token, user: { id, name, email } });
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
