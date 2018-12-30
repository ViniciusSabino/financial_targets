import Router from 'koa-joi-router';

const router = Router();

router.prefix('/goals');

router.route([
  {
    method: 'GET',
    path: '/',
    handler: []
  },
  {
    method: 'POST',
    path: '/',
    handler: []
  }
]);
