import Router from 'koa-joi-router';

import controller from '../controllers/accounts';

import validCreate from '../validators/create-account/valid-create';
import validPatchPartiallyPayment from '../validators/partially-payment/valid-patch-partially-payment';
import validPartiallyPayment from '../validators/partially-payment/valid-partially-payment';

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
