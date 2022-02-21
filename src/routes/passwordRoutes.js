import { Router } from 'express';

import { PasswordController } from '../controllers/PasswordController';

import { loginRequired } from '../middlewares/loginRequired';

const route = Router();

route.post('/', loginRequired, new PasswordController().store);

export default route;
