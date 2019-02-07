import config from "../config";

const home = ctx =>
    ctx.ok({
        title: "API Information",
        environment: config.environment,
        port: config.port
    });

export default home;
