import { Context } from 'koa';
import config from '../config';

export default (ctx: Context): Promise<void> =>
    ctx.ok({
        title: 'Financal Targets - Accounts API',
        environment: config.environment,
        port: config.port,
    });
