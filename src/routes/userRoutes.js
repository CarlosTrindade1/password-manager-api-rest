import { Router } from 'express';

import { UserController } from '../controllers/UserController';

import { userValidation } from '../middlewares/userValidation';

const route = Router();

route.get('/', new UserController().index);
route.post('/', userValidation, new UserController().store);

export default route;
