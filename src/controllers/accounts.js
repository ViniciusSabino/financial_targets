import createAccount from '../modules/create-account/create-account-service';
import findAccounts from '../modules/find-accounts/find-accounts-service';
import partiallyPaymentAccount from '../modules/partially-payment/partially-payment-account-service';

const create = async (ctx) => {
    const { body } = ctx.request;

    const created = await createAccount(body);

    return ctx.created(created);
};

const find = async (ctx) => {
    const { header } = ctx.request;

    const accounts = await findAccounts(header);

    return ctx.ok(accounts);
};

const partiallyPayment = async (ctx) => {
    const { unpaidAccount } = ctx.state;
    const { amountPaid } = ctx.request.body;

    const updatedAccount = await partiallyPaymentAccount(amountPaid, unpaidAccount);

    return ctx.ok(updatedAccount);
};

export default {
    create,
    find,
    partiallyPayment,
};
