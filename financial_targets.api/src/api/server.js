import Koa from "koa";
import respond from "koa-respond";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import chalk from "chalk";

import config from "./config";
import routes from "./routes";
import mongoose from "./database/mongodb";

const app = new Koa();

mongoose.createConnection();

app.use(bodyParser());
app.use(logger());
app.use(respond());
app.use(routes);

app.listen(config.port, () =>
    console.log(`\n API: ${chalk.blue("financial_targets.api")}
 Running on port: ${chalk.blue(config.port)} 
 Environment: ${chalk.blue(config.environment)}`)
);
