declare const findAccounts: ({ sort, order, limit, ...fields }: {
    [x: string]: any;
    sort: any;
    order: any;
    limit: any;
}) => Promise<any>;
export default findAccounts;
