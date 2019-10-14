import Koa from 'koa';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import chalk from 'chalk';

import config from './config';
import routes from './routes';
import mongo from './database/mongodb';
import errorHandling from './middlewares/error-handling';

const app = new Koa();

mongo.createConnection();

app.use(errorHandling);
app.use(bodyParser());
app.use(logger());
app.use(respond());
app.use(routes);

app.listen(config.port, () =>
    console.log(`\n API: ${chalk.blue('Financial Targets - Accounts API')}
 Running on port: ${chalk.blue(config.port)} 
 Environment: ${chalk.blue(config.environment)}`)
);
