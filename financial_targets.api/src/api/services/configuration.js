import Tag from "../models/tag";
import Configuration from "../models/configuration";
import api from "../utils/functions/api";

const listDefaultTags = async () => {
    const defaultTags = await Tag.find({ default: true });

    return api.createResult(defaultTags);
};

const saveConfiguration = async configuration => {
    const configurationInput = new Configuration(configuration);
    const data = await configurationInput.save();
    return data;
};

export default { listDefaultTags, saveConfiguration };
