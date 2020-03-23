/* eslint-disable no-console */
import chalk from 'chalk';
import mongoose from 'mongoose';

import config from '../../config';

const createConnection = () => {
    mongoose.connect(config.mongodb.connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => console.log(` Connected to Database: ${chalk.blue('Mongodb')} \n`));
};

export default createConnection;
