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
        handler: [validator.validDelete, controller.deleteAccounts],
    },
    {
        method: 'PATCH',
        path: '/',
        handler: [validator.validMakePayment, controller.makePayment],
    },
    {
        method: 'PATCH',
        path: '/makepartialpayment',
        handler: [validator.validMakePartialPayment, controller.makePartialPayment],
    },
    {
        method: 'PATCH',
        path: '/sendnext',
        handler: [validator.validSendNext, controller.sendNext],
    },
]);

export default router;
