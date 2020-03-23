/* eslint-disable no-console */
import Koa from 'koa';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import chalk from 'chalk';

import config from './config';
import routes from './routes';
import mongoDB from './database/mongodb';

const app = new Koa();

mongoDB();

app.use(bodyParser());
app.use(logger());
app.use(respond());
app.use(routes.openRoutes);

app.listen(config.port, () =>
    console.log(`\n API: ${chalk.blue('Financial Targets - Accounts API')}
 Running on port: ${chalk.blue(config.port)} 
 Environment: ${chalk.blue(config.environment)}`)
);
