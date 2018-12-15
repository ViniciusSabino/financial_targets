import Router from 'koa-joi-router';

import home from '../controllers/home';

const router = Router();

router.prefix('/home');

router.route({
  method: 'GET',
  path: '/',
  handler: [home]
});

export default router;
