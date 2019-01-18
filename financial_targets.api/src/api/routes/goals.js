import Router from "koa-joi-router";

import validator from "../validators/goals";
import goals from "../controllers/goals";

const router = Router();

router.prefix("/goals");

router.route([
    {
        method: "GET",
        path: "/",
        handler: []
    },
    {
        method: "POST",
        path: "/",
        handler: [validator.validCreate, goals.addGoal]
    }
]);

export default router;
