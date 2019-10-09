import config from '../config';

const home = (context) =>
    context.ok({
        title: 'Financal Targets - Accounts API',
        environment: config.environment,
        port: config.port,
    });

export default home;
