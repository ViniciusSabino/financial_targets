import Router from 'koa-joi-router';

import controller from '../controllers/accounts';

import { validPatchPartialPayment, validPostCreate } from '../domain/validators/request';
import { validPartialPayment } from '../domain/validators/account';

const router = Router();

router.prefix('/accounts');

router.route([
    {
        method: 'POST',
        path: '/',
        handler: [validPostCreate, controller.create],
    },
    {
        method: 'GET',
        path: '/',
        handler: [controller.find],
    },
    {
        method: 'PATCH',
        path: '/partialpayment',
        handler: [validPatchPartialPayment, validPartialPayment, controller.partialPayment],
    },
]);

export default router;
