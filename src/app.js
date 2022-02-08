import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/users/', userRoutes);
    this.app.use('/token/', tokenRoutes);
  }
}

export default new App().app;
