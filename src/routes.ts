import { Application } from 'express';

import { serverAdapter } from '@service/queues/base.queue';

import { authRoutes } from '@auth/routes/authRoutes';
import { currentUserRoutes } from '@auth/routes/currentRoutes';

import { authMiddleware } from '@global/helpers/auth-middleware';

const BASE_PATH = '/api/v1';

function applicationRoutes(app: Application) {
  const routes = () => {
    app.use('/queues', serverAdapter.getRouter());
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authRoutes.signoutRoutes());
    app.use(BASE_PATH, authMiddleware.verifyUser,  currentUserRoutes.routes());
  };
  routes();
}

export default applicationRoutes;
