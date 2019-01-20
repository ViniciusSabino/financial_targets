import Tag from "../models/tag";
import Configuration from "../models/configuration";
import util from "../utils/functions";

const listDefaultTags = async () => {
    const defaultTags = await Tag.find({ default: true });

    return util.createResult(defaultTags);
};

const saveConfiguration = async configuration => {
    const configurationInput = new Configuration(configuration);
    const data = await configurationInput.save();
    return data;
};

export default { listDefaultTags, saveConfiguration };
