/// <reference types="koa" />
/// <reference types="koa-bodyparser" />
/// <reference types="koa-joi-router" />
import compose from 'koa-compose';
declare const _default: {
    openRoutes: compose.ComposedMiddleware<import("koa").ParameterizedContext<import("koa").DefaultState, import("koa").DefaultContext>>;
};
export default _default;
