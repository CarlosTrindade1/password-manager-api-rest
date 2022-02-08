import { Router } from 'express';

import { TokenController } from '../controllers/TokenController';

const route = Router();

route.post('/', new TokenController().handle);

export default route;
