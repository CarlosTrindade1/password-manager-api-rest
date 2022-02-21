import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

export class UserController {
  async index(request, response) {
    const prisma = new PrismaClient();

    try {
      const allUsers = await prisma.user.findMany();

      return response.json(allUsers);
    } catch (e) {
      return response.json(e);
    } finally {
      prisma.$disconnect();
    }
  }

  async store(request, response) {
    const prisma = new PrismaClient();
    const { name, email } = request.body;
    let { password } = request.body;

    password = await bcryptjs.hash(password, 8);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      const { id } = user;

      return response.json({ id, name, email });
    } catch (e) {
      if (e.meta.target[0] === 'email') {
        return response.status(400).json({
          errors: ['E-mail já existente.'],
        });
      }
      return response.status(500).json(e);
    } finally {
      prisma.$disconnect();
    }
  }
}
