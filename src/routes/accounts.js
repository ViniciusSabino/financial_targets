import Router from 'koa-joi-router';

import controller from '../controllers/accounts';

import { validCreate, validPartiallyPayment, validPatchPartiallyPayment } from '../validators';

const router = Router();

router.prefix('/accounts');

router.route([
    {
        method: 'POST',
        path: '/',
        handler: [validCreate, controller.create],
    },
    {
        method: 'GET',
        path: '/',
        handler: [controller.find],
    },
    {
        method: 'PATCH',
        path: '/partiallypayment',
        handler: [validPatchPartiallyPayment, validPartiallyPayment, controller.partiallyPayment],
    },
]);

export default router;
