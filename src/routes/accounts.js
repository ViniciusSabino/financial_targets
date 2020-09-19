import Router from 'koa-joi-router';

import controller from '../controllers/accounts';

import { validCreate, validPatch, checkEditingRules } from '../validators/services';
import { setAccountState } from '../middlewares/account-middlewares';

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
        path: '/:id',
        handler: [validPatch, setAccountState, checkEditingRules, controller.patch],
    },
]);

export default router;
