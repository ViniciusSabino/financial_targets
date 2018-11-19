import config from '../config';

const home = async ctx =>
  await ctx.ok({
    title: 'API Information',
    environment: config.environment,
    port: config.port
  });

export default home;
