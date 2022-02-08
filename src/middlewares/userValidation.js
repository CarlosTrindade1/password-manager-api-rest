import { isEmail } from 'validator';

export function userValidation(request, response, next) {
  const errors = [];
  const { name, email, password } = request.body;

  if (!isEmail(email)) {
    errors.push('E-mail inválido.');
  }

  if (name.length < 3 || name.length > 255) {
    errors.push('Nome inválido.');
  }

  if (password.length < 8 || password.length > 50) {
    errors.push('A senha precisa ter entre 8 e 50 caracteres');
  }

  if (errors.length > 0) {
    return response.status(400).json({
      errors,
    });
  }

  return next();
}
