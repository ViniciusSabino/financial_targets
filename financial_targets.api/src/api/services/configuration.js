import Tag from '../models/tag';
import Configuration from '../models/configuration';

const listDefaultTags = async () => {
  const defaultTags = await Tag.find({ default: true });
  return defaultTags;
};

const saveConfiguration = async configuration => {
  const configurationInput = new Configuration(configuration);
  const data = await configurationInput.save();
  return data;
};

export default { listDefaultTags, saveConfiguration };
