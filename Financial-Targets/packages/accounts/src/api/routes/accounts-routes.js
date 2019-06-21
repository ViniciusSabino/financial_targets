import Router from 'koa-joi-router';

import controller from '../controllers/accounts-controller';
import * as validator from '../validators';

const router = Router();

router.prefix('/accounts');

router.route([
    {
        method: 'POST',
        path: '/',
        handler: [validator.validCreate, controller.create],
    },
    {
        method: 'GET',
        path: '/',
        handler: [controller.find],
    },
    {
        method: 'PUT',
        path: '/',
        handler: [validator.validEdit, controller.edit],
    },
    {
        method: 'DELETE',
        path: '/',
        handler: [controller.deleteAccounts],
    },
    {
        method: 'PATCH',
        path: '/',
        handler: [controller.makePayment],
    },
    {
        method: 'PATCH',
        path: '/makepartialpayment',
        handler: [controller.makePartialPayment],
    },
    {
        method: 'PATCH',
        path: '/sendnext',
        handler: [controller.sendNext],
    },
]);

export default router;
