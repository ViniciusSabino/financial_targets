import { Context, Next } from 'koa';
declare const validCreate: (ctx: Context, next: Next) => Promise<void>;
export default validCreate;
