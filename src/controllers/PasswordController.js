import { PrismaClient } from '@prisma/client';

export class PasswordController {
  async store(request, response) {
    const prisma = new PrismaClient();

    const { password, account, userId } = request.body;

    try {
      const createdPassword = await prisma.password.create({
        data: {
          password, account, userId,
        },
      });

      return response.json(createdPassword);
    } catch (error) {
      return response.status(400).json({
        errors: ['Erro inesperado'],
      });
    } finally {
      prisma.$disconnect();
    }
  }
}
