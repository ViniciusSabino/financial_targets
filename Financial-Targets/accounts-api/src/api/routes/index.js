import compose from "koa-compose";

import homeRouter from "./home";
import accountsRouter from "./accounts";
import configurationRouter from "./configuration";
import goalsRouter from "./goals";

export default compose([
    homeRouter.middleware(),
    accountsRouter.middleware(),
    configurationRouter.middleware(),
    goalsRouter.middleware(),
]);
