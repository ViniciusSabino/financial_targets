import Router from "koa-joi-router";

import validator from "../validators/goals";
import goals from "../controllers/goals";

const router = Router();

router.prefix("/goals");

router.route([
    {
        method: "GET",
        path: "/",
        handler: [],
    },
    {
        method: "POST",
        path: "/",
        handler: [validator.validCreate, goals.addGoal],
    },
    {
        method: "GET",
        path: "/all",
        handler: [goals.listAllGoals],
    },
    {
        method: "GET",
        path: "/details",
        handler: [validator.validFindGoal, goals.details],
    },
]);

export default router;
