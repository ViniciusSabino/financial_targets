import config from '../config';

export default (ctx) =>
    ctx.ok({
        title: 'Financal Targets - Accounts API',
        environment: config.environment,
        port: config.port,
    });
