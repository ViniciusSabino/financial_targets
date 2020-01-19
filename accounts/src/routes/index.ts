import compose from 'koa-compose';

import homeRouter from './home';
import accountsRouter from './accounts';

const openRoutes = [homeRouter, accountsRouter];

export default {
    openRoutes: compose(openRoutes.map((routes) => routes.middleware())),
};
