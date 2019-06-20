import Router from 'koa-joi-router';

import accounts from '../controllers/accounts-controller';
import * as validator from '../validators';

const router = Router();

router.prefix('/accounts');

router.route([
    {
        method: 'POST',
        path: '/',
        handler: [validator.validCreate, accounts.create],
    },
    {
        method: 'GET',
        path: '/',
        handler: [accounts.find],
    },
    {
        method: 'GET',
        path: '/all',
        handler: [accounts.listAll],
    },
    {
        method: 'PUT',
        path: '/',
        handler: [accounts.edit],
    },
    {
        method: 'DELETE',
        path: '/',
        handler: [accounts.deleteAccounts],
    },
    {
        method: 'PATCH',
        path: '/',
        handler: [accounts.makePayment],
    },
    {
        method: 'PATCH',
        path: '/makepartialpayment',
        handler: [accounts.makePartialPayment],
    },
    {
        method: 'PATCH',
        path: '/sendnext',
        handler: [accounts.sendNext],
    },
]);

export default router;
