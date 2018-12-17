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

const editAccount = async ctx => {
  const account = ctx.request.body;
  const { accountid } = ctx.request.header;
  const accountUpdated = await service.editAccount(accountid, account);
  return ctx.ok({
    data: accountUpdated
  });
};

const deleteAccounts = async ctx => {
  const { accountsIds } = ctx.request.body;
  await service.deleteAccounts(accountsIds);
  return ctx.ok();
};

const makePayment = async ctx => {
  const { accountsIds } = ctx.request.body;
  const adjustedData = await service.makePayment(accountsIds);
  return ctx.ok({
    data: adjustedData
  });
};

const makePartialPayment = async ctx => {
  const { amountPaid, accountId } = ctx.request.body;
  const data = await service.makePartialPayment({ amountPaid, accountId });
  return data.errors.length ? ctx.badRequest(data) : ctx.ok(data);
};

const sendNext = async ctx =>
  await ctx.ok({
    ok: ctx.request.body
  });

export default {
  addAccounts,
  listAccounts,
  listAllAccounts,
  editAccount,
  deleteAccounts,
  makePayment,
  makePartialPayment,
  sendNext
};
