import Router from 'koa-joi-router';

import accounts from '../controllers/accounts';

const router = Router();

router.prefix('/accounts');

router.route([
  {
    method: 'POST',
    path: '/',
    handler: [accounts.addAccounts]
  },
  {
    method: 'GET',
    path: '/',
    handler: [accounts.listAccounts]
  },
  {
    method: 'PUT',
    path: '/',
    handler: [accounts.editAccounts]
  },
  {
    method: 'DELETE',
    path: '/',
    handler: [accounts.deleteAccounts]
  },
  {
    method: 'PATCH',
    path: '/',
    handler: [accounts.makePayment]
  },
  {
    method: 'PATCH',
    path: '/makepartialpayment',
    handler: [accounts.makePartialPayment]
  },
  {
    method: 'PATCH',
    path: '/sendnext',
    handler: [accounts.sendNext]
  }
]);

export default router;
