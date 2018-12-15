import Koa from 'koa';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';

import config from './config';
import routes from './routes';
import mongoose from './database/mongodb';

const app = new Koa();

mongoose.createConnection();

app.use(bodyParser());
app.use(respond());
app.use(routes);

app.listen(config.port, () => console.log(`API running on port ${config.port} in the environment of ${config.environment}`));
