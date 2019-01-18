import service from "../services/configuration";

const listDefaultTags = async ctx => {
    const defaultTags = await service.listDefaultTags();
    await ctx.ok({
        data: defaultTags,
        count: defaultTags.length
    });
};

const saveConfiguration = async ctx => {
    const configuration = ctx.request.body;
    const data = await service.saveConfiguration(configuration);
    return ctx.created({ data });
};

export default {
    listDefaultTags,
    saveConfiguration
};
