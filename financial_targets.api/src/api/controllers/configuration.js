import configuration from '../services/configuration';

const listDefaultTags = async ctx => {
  const defaultTags = await configuration.listDefaultTags();
  await ctx.ok({
    data: defaultTags,
    count: defaultTags.length
  });
};

export default {
  listDefaultTags
};
