import compose from "koa-compose";

import homeRouter from "./home";
import accountsRouter from "./accounts";

export default compose([homeRouter.middleware(), accountsRouter.middleware()]);
