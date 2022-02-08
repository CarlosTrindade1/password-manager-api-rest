import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

export async function loginRequired(request, response, next) {
  const { authorization } = request.headers;
  const prisma = new PrismaClient();

  if (!authorization) {
    return response.status(400).json({
      errors: ['Não autorizado'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = dados;

    const user = await prisma.user.findFirst({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return response.status(400).json({
        errors: ['Usuário inválido'],
      });
    }

    request.userId = id;
    request.userEmail = email;

    return next();
  } catch (error) {
    return response.status(401).json({
      errors: ['Token inspirado ou inválido'],
    });
  }
}
