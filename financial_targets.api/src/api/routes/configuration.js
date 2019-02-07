import Router from "koa-joi-router";

import configuration from "../controllers/configuration";
import validator from "../validators/configuration";

const router = Router();

router.prefix("/configuration");

router.route([
    {
        method: "GET",
        path: "/tags",
        handler: [configuration.listDefaultTags]
    },
    {
        method: "POST",
        path: "/",
        handler: [
            validator.validSaveConfiguration,
            configuration.saveConfiguration
        ]
    }
]);

export default router;
