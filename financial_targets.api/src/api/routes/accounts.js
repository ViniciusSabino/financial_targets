import Router from 'koa-joi-router';

import accounts from '../controllers/accounts';
import validator from '../validators/accounts';

const router = Router();

router.prefix('/accounts');

router.route([
  {
    method: 'POST',
    path: '/',
    handler: [validator.validSave, accounts.addAccounts]
  },
  {
    method: 'GET',
    path: '/',
    handler: [accounts.listAccounts]
  },
  {
    method: 'GET',
    path: '/all',
    handler: [validator.validFindAllAccounts, accounts.listAllAccounts]
  },
  {
    method: 'PUT',
    path: '/',
    handler: [validator.validEdit, accounts.editAccount]
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
    handler: [validator.validMakePartialPayment, accounts.makePartialPayment]
  },
  {
    method: 'PATCH',
    path: '/sendnext',
    handler: [accounts.sendNext]
  }
]);

export default router;
