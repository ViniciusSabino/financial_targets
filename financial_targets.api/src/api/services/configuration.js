import Tag from "../models/tag";
import Configuration from "../models/configuration";
import application from "../utils/functions/application";

const listDefaultTags = async () => {
    const defaultTags = await Tag.find({ default: true });

    return application.result(defaultTags);
};

const saveConfiguration = async (configuration) => {
    const configurationInput = new Configuration(configuration);
    const data = await configurationInput.save();
    return data;
};

export default { listDefaultTags, saveConfiguration };
