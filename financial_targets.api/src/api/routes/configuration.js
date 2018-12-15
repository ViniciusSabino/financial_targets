import Router from 'koa-joi-router';

import configuration from '../controllers/configuration';

const router = Router();

router.prefix('/configuration');

router.route([
  {
    method: 'GET',
    path: '/tags',
    handler: [configuration.listDefaultTags]
  }
]);

export default router;
