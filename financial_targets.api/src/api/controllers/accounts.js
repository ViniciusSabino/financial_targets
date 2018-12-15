import service from '../services/accounts';

const addAccounts = async ctx => {
  const account = ctx.request.body;
  await service.saveAccount(account);
  return ctx.created({
    ok: ctx.request.body
  });
};

const listAccounts = async ctx =>
  await ctx.ok({
    ok: 'Listar mensalidades'
  });

const editAccounts = async ctx =>
  await ctx.ok({
    ok: ctx.request.body
  });

const deleteAccounts = async ctx =>
  await ctx.ok({
    ok: 'Excluida'
  });

const makePayment = async ctx =>
  await ctx.ok({
    ok: ctx.request.body
  });

const makePartialPayment = async ctx =>
  await ctx.ok({
    ok: ctx.request.headers.valuetopay
  });

const sendNext = async ctx =>
  await ctx.ok({
    ok: ctx.request.body
  });

export default {
  addAccounts,
  listAccounts,
  editAccounts,
  deleteAccounts,
  makePayment,
  makePartialPayment,
  sendNext
};
