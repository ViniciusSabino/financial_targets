import service from '../services/configuration';

const listDefaultTags = async ctx => {
  const defaultTags = await service.listDefaultTags();
  await ctx.ok({
    data: defaultTags,
    count: defaultTags.length
  });
};

export default {
  listDefaultTags
};
