import Tag from '../models/tag';

const listDefaultTags = async () => {
  const defaultTags = await Tag.find({ default: true });
  return defaultTags;
};

export default { listDefaultTags };
