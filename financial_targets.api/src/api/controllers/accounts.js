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

const listAllAccounts = async ctx => {
  const { userid } = ctx.request.header;
  const accounts = await service.listAllAccounts(userid);
  return ctx.ok({
    count: accounts.length,
    data: accounts
  });
};

const editAccounts = async ctx =>
  await ctx.ok({
    ok: ctx.request.body
  });

const deleteAccounts = async ctx =>
  await ctx.ok({
    ok: 'Excluida'
  });

const makePayment = async ctx => {
  const { accountsIds } = ctx.request.body;
  const adjustedData = await service.makePayment(accountsIds);
  await ctx.ok({
    data: adjustedData
  });
};

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
  listAllAccounts,
  editAccounts,
  deleteAccounts,
  makePayment,
  makePartialPayment,
  sendNext
};
