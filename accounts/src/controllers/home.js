import config from '../config';

export default (ctx) =>
    ctx.ok({
        name: config.name,
        environment: config.environment,
        port: config.port,
    });
