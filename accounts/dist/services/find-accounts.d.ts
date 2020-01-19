import { Document } from 'mongoose';
declare const findAccounts: ({ sort, order, limit, ...fields }: {
    sort: string;
    order: string;
    limit: number;
}) => Promise<Document[]>;
export default findAccounts;
