import mongoose from 'mongoose';

import config from '../../config';

const createConnection = () => {
  mongoose.connect(config.mongo.connection);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => console.log('Connected to mongodb'));
};

export default {
  createConnection
};
