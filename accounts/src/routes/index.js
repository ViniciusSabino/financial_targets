import compose from 'koa-compose';

import homeRouter from './home-routes';
import accountsRouter from './accounts-routes';

export default compose([homeRouter.middleware(), accountsRouter.middleware()]);
