declare const _default: {
    createAccount: (account: any) => Promise<void>;
    findAccounts: ({ sort, order, limit, ...fields }: {
        [x: string]: any;
        sort: any;
        order: any;
        limit: any;
    }) => Promise<any>;
    partiallyPayment: (amountPaid: any, unpaidAccount: any) => Promise<any>;
};
export default _default;
